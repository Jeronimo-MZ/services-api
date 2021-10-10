import { DbAddUser } from "@/data/usecases/AddUser/DbAddUser";
import { BcryptAdapter } from "@/infra/cryptography/BcryptAdapter/BcryptAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { SignUpController } from "@/presentation/controllers/User/SignUp/SignUpController";
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
