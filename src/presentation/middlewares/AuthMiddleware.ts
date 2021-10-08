import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";

import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden } from "../helpers/http/httpHelper";
import { HttpResponse } from "../protocols";
import { Middleware } from "../protocols/middleware";

export class AuthMiddleware implements Middleware<AuthMiddleware.Request> {
    constructor(private readonly loadUserByToken: LoadUserByToken) {}
    async handle(request: AuthMiddleware.Request): Promise<HttpResponse> {
        const { accessToken } = request;
        if (!accessToken) return forbidden(new AccessDeniedError());
        await this.loadUserByToken.load(accessToken);
        return undefined as any;
    }
}

export namespace AuthMiddleware {
    export type Request = {
        accessToken?: string;
    };
}