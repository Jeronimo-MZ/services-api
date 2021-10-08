import { AddCustomer } from "@/domain/usecases/AddCustomer";
import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class AddCustomerController
    implements Controller<AddCustomerController.Request>
{
    constructor(
        private readonly validation: Validation,
        private readonly addCustomer: AddCustomer,
    ) {}

    async handle(
        request: AddCustomerController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) return badRequest(error);
            const { institution, name, userId } = request;
            await this.addCustomer.add({
                institution,
                name,
                providerId: userId,
            });
            return undefined as any;
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace AddCustomerController {
    export type Request = {
        userId: string;
        name: string;
        institution: string;
    };
}
