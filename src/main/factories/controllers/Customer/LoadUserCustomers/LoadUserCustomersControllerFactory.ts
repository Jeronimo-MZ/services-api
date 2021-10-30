import {
    makeLoadUserCustomers,
    makeLogControllerDecorator,
} from "@/main/factories";
import { LoadUserCustomersController } from "@/presentation/controllers";
import { Controller } from "@/presentation/protocols";
import { RequiredFieldValidation } from "@/validation/validators";

export const makeLoadUserCustomersController = (): Controller => {
    const validation = new RequiredFieldValidation("userId");
    const controller = new LoadUserCustomersController(
        validation,
        makeLoadUserCustomers(),
    );

    return makeLogControllerDecorator(controller);
};
