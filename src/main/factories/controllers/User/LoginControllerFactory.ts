import {
    makeDbAuthentication,
    makeLogControllerDecorator,
} from "@/main/factories";
import { LoginController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";

import { makeLoginValidation } from "./LoginValidationFactory";

export const makeLoginController = (): Controller => {
    const controller = new LoginController(
        makeLoginValidation(),
        makeDbAuthentication(),
    );

    return makeLogControllerDecorator(controller);
};
