import { AuthMiddleware } from "@/presentation/middlewares";

import { makeLoadUserByToken } from "../usecases/LoadUserByTokenFactory";

export const makeAuthMiddleware = (): AuthMiddleware => {
    return new AuthMiddleware(makeLoadUserByToken());
};
