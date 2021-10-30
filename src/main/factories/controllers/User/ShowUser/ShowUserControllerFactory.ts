import {
    makeLoadUserByToken,
    makeLogControllerDecorator,
} from "@/main/factories";
import { ShowUserController } from "@/presentation/controllers";
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
