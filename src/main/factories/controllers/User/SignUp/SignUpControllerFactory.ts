import { DbAddUser } from "@/data/usecases";
import { BcryptAdapter } from "@/infra/cryptography";
import { UserMongoRepository } from "@/infra/database/mongodb";
import { makeLogControllerDecorator } from "@/main/factories";
import { SignUpController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";

import { makeSignUpValidation } from "./SignUpValidationFactory";

export const makeSignUpController = (): Controller => {
    const salt = 12;
    const hasher = new BcryptAdapter(salt);
    const userRepository = new UserMongoRepository();
    const addUser = new DbAddUser(hasher, userRepository, userRepository);
    const controller = new SignUpController(makeSignUpValidation(), addUser);

    return makeLogControllerDecorator(controller);
};
