import { AddCustomer } from "@/domain/usecases";
import { badRequest, ok, serverError } from "@/presentation/helpers";
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
            const customer = await this.addCustomer.add({
                institution,
                name,
                providerId: userId,
            });
            return ok(customer);
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
