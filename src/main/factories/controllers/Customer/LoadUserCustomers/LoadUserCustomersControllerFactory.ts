import { makeLoadUserCustomers } from "@/main/factories/usecases/LoadUserCustomersFactory";
import { LoadUserCustomersController } from "@/presentation/controllers/Customer/LoadUserCustomers/LoadUserCustomersController";
import { RequiredFieldValidation } from "@/validation/validators";

export const makeLoadUserCustomersController =
    (): LoadUserCustomersController => {
        const validation = new RequiredFieldValidation("userId");
        return new LoadUserCustomersController(
            validation,
            makeLoadUserCustomers(),
        );
    };
