import { LoadUserServicesProvided } from "@/domain/usecases/LoadUserServicesProvided";
import {
    badRequest,
    ok,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoadUserServicesProvidedController
    implements Controller<LoadUserServicesProvidedController.Request>
{
    constructor(
        private readonly validation: Validation,
        private readonly loadUserServicesProvided: LoadUserServicesProvided,
    ) {}

    async handle(
        request: LoadUserServicesProvidedController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const servicesProvided = await this.loadUserServicesProvided.load(
                request.userId,
            );
            return ok(servicesProvided);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace LoadUserServicesProvidedController {
    export type Request = {
        userId: string;
    };
}
