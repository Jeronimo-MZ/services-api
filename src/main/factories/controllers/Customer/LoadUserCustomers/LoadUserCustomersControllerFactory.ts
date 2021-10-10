import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { makeLoadUserCustomers } from "@/main/factories/usecases/LoadUserCustomersFactory";
import { LoadUserCustomersController } from "@/presentation/controllers/Customer/LoadUserCustomers/LoadUserCustomersController";
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
