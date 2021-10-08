import { Authentication } from "@/domain/usecases/Authentication";
import {
    badRequest,
    ok,
    serverError,
    unauthorized,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoginController implements Controller<LoginController.Request> {
    constructor(
        private readonly validation: Validation,
        private readonly authentication: Authentication,
    ) {}
    async handle(request: LoginController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) return badRequest(error);

            const { email, password } = request;
            const token = await this.authentication.auth({ email, password });

            if (!token) return unauthorized();

            return ok(token);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}
export namespace LoginController {
    export type Request = {
        email: string;
        password: string;
    };
}
