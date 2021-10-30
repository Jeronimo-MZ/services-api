import { DbAuthentication } from "@/data/usecases";
import { BcryptAdapter, JwtAdapter } from "@/infra/cryptography";
import { UserMongoRepository } from "@/infra/database/mongodb";
import { env } from "@/main/config/env";

export const makeDbAuthentication = (): DbAuthentication => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.secret);
    const userRepository = new UserMongoRepository();
    return new DbAuthentication(
        userRepository,
        bcryptAdapter,
        jwtAdapter,
        userRepository,
    );
};
