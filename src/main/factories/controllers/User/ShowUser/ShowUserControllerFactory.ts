import { makeLoadUserByToken } from "@/main/factories/usecases/LoadUserByTokenFactory";
import { ShowUserController } from "@/presentation/controllers/User/ShowUser/ShowUserController";
import { RequiredFieldValidation } from "@/validation/validators";

export const makeShowUserController = (): ShowUserController => {
    const validation = new RequiredFieldValidation("accessToken");
    return new ShowUserController(validation, makeLoadUserByToken());
};
