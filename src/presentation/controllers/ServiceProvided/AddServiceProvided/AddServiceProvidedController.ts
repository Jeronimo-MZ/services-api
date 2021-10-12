import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class AddServiceProvidedController
    implements Controller<AddServiceProvidedController.Request>
{
    constructor(private readonly validation: ValidationSpy) {}

    async handle(
        request: AddServiceProvidedController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            return undefined as any;
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace AddServiceProvidedController {
    export type Request = {
        providerId: string;
        customerId: string;
        name: string;
        price: number;
        details?: string;
        paymentDate?: Date;
    };
}
