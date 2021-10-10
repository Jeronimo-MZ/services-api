import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { makeDbAuthentication } from "@/main/factories/usecases/AuthenticationFactory";
import { LoginController } from "@/presentation/controllers/User/Login/LoginController";
import { Controller } from "@/presentation/protocols";

import { makeLoginValidation } from "./LoginValidationFactory";

export const makeLoginController = (): Controller => {
    const controller = new LoginController(
        makeLoginValidation(),
        makeDbAuthentication(),
    );

    return makeLogControllerDecorator(controller);
};
