import { makeLoadUserByToken } from "@/main/factories";
import { AuthMiddleware } from "@/presentation/middlewares";

export const makeAuthMiddleware = (): AuthMiddleware => {
    return new AuthMiddleware(makeLoadUserByToken());
};
