import { makeDbAuthentication } from "@/main/factories/usecases/AuthenticationFactory";
import { LoginController } from "@/presentation/controllers/User/Login/LoginController";

import { makeLoginValidation } from "./LoginValidationFactory";

export const makeLoginController = (): LoginController => {
    return new LoginController(makeLoginValidation(), makeDbAuthentication());
};
