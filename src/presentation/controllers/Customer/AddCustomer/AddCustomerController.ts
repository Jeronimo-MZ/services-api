import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class AddCustomerController
    implements Controller<AddCustomerController.Request>
{
    constructor(private readonly validation: Validation) {}

    async handle(
        request: AddCustomerController.Request,
    ): Promise<HttpResponse> {
        this.validation.validate(request);
        return undefined as any;
    }
}

export namespace AddCustomerController {
    export type Request = {
        userId: string;
        name: string;
        institution: string;
    };
}
