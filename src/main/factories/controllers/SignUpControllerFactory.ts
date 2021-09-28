import { DbAddUser } from "@/data/usecases/DbAddUser";
import { BcryptAdapter } from "@/infra/cryptography/BcryptAdapter/BcryptAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { SignUpController } from "@/presentation/controllers/User/SignUp/SignUpController";

import { makeSignUpValidation } from "./SignUpValidationFactory";

export const makeSignUpController = (): SignUpController => {
    const salt = 12;
    const hasher = new BcryptAdapter(salt);
    const userRepository = new UserMongoRepository();
    const addUser = new DbAddUser(hasher, userRepository, userRepository);
    return new SignUpController(makeSignUpValidation(), addUser);
};
