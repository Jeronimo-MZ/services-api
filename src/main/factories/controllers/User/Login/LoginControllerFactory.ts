import { DbAuthentication } from "@/data/usecases/Authentication/DbAuthentication";
import { BcryptAdapter } from "@/infra/cryptography/BcryptAdapter/BcryptAdapter";
import { JwtAdapter } from "@/infra/cryptography/JwtAdapter/JwtAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { env } from "@/main/config/env";
import { LoginController } from "@/presentation/controllers/User/Login/LoginController";

import { makeLoginValidation } from "./LoginValidationFactory";

export const makeLoginController = (): LoginController => {
    const salt = 12;
    const bcryptAdapter = new BcryptAdapter(salt);
    const jwtAdapter = new JwtAdapter(env.secret);
    const userRepository = new UserMongoRepository();
    const authentication = new DbAuthentication(
        userRepository,
        bcryptAdapter,
        jwtAdapter,
        userRepository,
    );

    return new LoginController(makeLoginValidation(), authentication);
};
