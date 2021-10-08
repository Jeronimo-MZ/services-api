import { DbLoadUserByToken } from "@/data/usecases/LoadUser/DbLoadUserByToken";
import { JwtAdapter } from "@/infra/cryptography/JwtAdapter/JwtAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { env } from "@/main/config/env";
import { AuthMiddleware } from "@/presentation/middlewares";
import { Middleware } from "@/presentation/protocols";

export const makeAuthMiddleware = (): Middleware => {
    const jwtAdapter = new JwtAdapter(env.secret);
    const userMongoRepository = new UserMongoRepository();
    const loadUserByToken = new DbLoadUserByToken(
        userMongoRepository,
        jwtAdapter,
    );
    return new AuthMiddleware(loadUserByToken);
};
