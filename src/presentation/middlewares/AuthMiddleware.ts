import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden } from "../helpers/http/httpHelper";
import { HttpResponse } from "../protocols";
import { Middleware } from "../protocols/middleware";

export class AuthMiddleware implements Middleware<AuthMiddleware.Request> {
    async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
        const { accessToken } = request;
        if (!accessToken) return forbidden(new AccessDeniedError());
        return undefined as any;
    }
}

export namespace AuthMiddleware {
    export type Request = {
        accessToken?: string;
    };
}
