import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";
import {
    badRequest,
    ok,
    serverError,
    unauthorized,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class ShowUserController
    implements Controller<ShowUserController.Request>
{
    constructor(
        private readonly validation: Validation,
        private readonly loadUserByToken: LoadUserByToken,
    ) {}
    async handle(request: ShowUserController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const user = await this.loadUserByToken.load(request.accessToken);

            return user
                ? ok({ ...user, password: undefined, accessToken: undefined })
                : unauthorized();
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace ShowUserController {
    export type Request = {
        accessToken: string;
    };
}
