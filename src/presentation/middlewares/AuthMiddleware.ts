import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";
import { AccessDeniedError } from "@/presentation/errors/AccessDeniedError";
import {
    forbidden,
    ok,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { HttpResponse } from "@/presentation/protocols";
import { Middleware } from "@/presentation/protocols/middleware";

export class AuthMiddleware implements Middleware<AuthMiddleware.Request> {
    constructor(private readonly loadUserByToken: LoadUserByToken) {}
    async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
        try {
            const { accessToken } = request;
            if (accessToken) {
                const user = await this.loadUserByToken.load(accessToken);
                if (user) return ok({ userId: user.id });
            }
            return forbidden(new AccessDeniedError());
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace AuthMiddleware {
    export type Request = {
        accessToken?: string;
    };
}
