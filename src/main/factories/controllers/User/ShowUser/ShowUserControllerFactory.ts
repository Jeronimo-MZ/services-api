import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { makeLoadUserByToken } from "@/main/factories/usecases/LoadUserByTokenFactory";
import { ShowUserController } from "@/presentation/controllers/User/ShowUser/ShowUserController";
import { Controller } from "@/presentation/protocols";
import { RequiredFieldValidation } from "@/validation/validators";

export const makeShowUserController = (): Controller => {
    const validation = new RequiredFieldValidation("accessToken");
    const controller = new ShowUserController(
        validation,
        makeLoadUserByToken(),
    );
    return makeLogControllerDecorator(controller);
};
