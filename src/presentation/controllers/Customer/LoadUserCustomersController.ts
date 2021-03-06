import { LoadUserCustomers } from "@/domain/usecases";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoadUserCustomersController
    implements Controller<LoadUserCustomersController.Request>
{
    constructor(
        private readonly validation: Validation,
        private readonly loadUserCustomers: LoadUserCustomers,
    ) {}

    async handle(
        request: LoadUserCustomersController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const customers = await this.loadUserCustomers.load(request.userId);
            return ok(customers);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace LoadUserCustomersController {
    export type Request = {
        userId: string;
    };
}
