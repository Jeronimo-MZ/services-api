import { DbLoadUserByToken } from "@/data/usecases/LoadUser/DbLoadUserByToken";
import { JwtAdapter } from "@/infra/cryptography/JwtAdapter/JwtAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { env } from "@/main/config/env";
import { ShowUserController } from "@/presentation/controllers/User/ShowUser/ShowUserController";
import { RequiredFieldValidation } from "@/validation/validators";

export const makeShowUserController = (): ShowUserController => {
    const validation = new RequiredFieldValidation("accessToken");
    const usersRepository = new UserMongoRepository();
    const jwtAdapter = new JwtAdapter(env.secret);
    const loadUserByToken = new DbLoadUserByToken(usersRepository, jwtAdapter);
    return new ShowUserController(validation, loadUserByToken);
};
