import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoadUserCustomersController
    implements Controller<LoadUserCustomersController.Request>
{
    constructor(private readonly validation: Validation) {}

    async handle(
        request: LoadUserCustomersController.Request,
    ): Promise<HttpResponse> {
        const error = this.validation.validate(request);
        if (error) {
            return badRequest(error);
        }
        return undefined as any;
    }
}

export namespace LoadUserCustomersController {
    export type Request = {
        userId: string;
    };
}
