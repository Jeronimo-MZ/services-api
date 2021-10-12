import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { Controller, HttpResponse } from "@/presentation/protocols";

export class AddServiceProvidedController
    implements Controller<AddServiceProvidedController.Request>
{
    constructor(private readonly validation: ValidationSpy) {}

    async handle(
        request: AddServiceProvidedController.Request,
    ): Promise<HttpResponse> {
        this.validation.validate(request);
        return undefined as any;
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
