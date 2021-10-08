import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class AddCustomerController
    implements Controller<AddCustomerController.Request>
{
    constructor(private readonly validation: Validation) {}

    async handle(
        request: AddCustomerController.Request,
    ): Promise<HttpResponse> {
        const error = this.validation.validate(request);
        if (error) return badRequest(error);
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
