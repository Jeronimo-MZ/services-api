import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";
import {
    badRequest,
    ok,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class AddServiceProvidedController
    implements Controller<AddServiceProvidedController.Request>
{
    constructor(
        private readonly validation: Validation,
        private readonly addServiceProvided: AddServiceProvided,
    ) {}

    async handle(
        request: AddServiceProvidedController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const { customerId, name, price, userId, details, paymentDate } =
                request;
            const serviceProvided = await this.addServiceProvided.add({
                customerId,
                name,
                price,
                providerId: userId,
                details,
                paymentDate: paymentDate ? new Date(paymentDate) : paymentDate,
            });
            if (serviceProvided instanceof Error) {
                return badRequest(serviceProvided);
            }
            return ok(serviceProvided);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace AddServiceProvidedController {
    export type Request = {
        userId: string;
        customerId: string;
        name: string;
        price: number;
        details?: string;
        paymentDate?: Date;
    };
}
