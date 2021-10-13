import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoadUserServicesProvidedController
    implements Controller<LoadUserServicesProvidedController.Request>
{
    constructor(private readonly validation: Validation) {}

    async handle(
        request: LoadUserServicesProvidedController.Request,
    ): Promise<HttpResponse> {
        const error = this.validation.validate(request);
        if (error) {
            return badRequest(error);
        }
        return undefined as any;
    }
}

export namespace LoadUserServicesProvidedController {
    export type Request = {
        userId: string;
    };
}
