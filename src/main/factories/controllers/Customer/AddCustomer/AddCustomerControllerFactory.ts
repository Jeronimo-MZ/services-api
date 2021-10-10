import { DbAddCustomer } from "@/data/usecases/AddCustomer/DbAddCustomer";
import { CustomerMongoRepository } from "@/infra/database/mongodb/repositories/Customer/Customer";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { AddCustomerController } from "@/presentation/controllers/Customer/AddCustomer/AddCustomerController";
import { Controller } from "@/presentation/protocols";

import { makeAddCustomerValidation } from "./AddCustomerValidationFactory";

export const makeAddCustomerController = (): Controller => {
    const userMongoRepository = new UserMongoRepository();
    const customerMongoRepository = new CustomerMongoRepository();
    const addCustomer = new DbAddCustomer(
        userMongoRepository,
        customerMongoRepository,
    );
    const controller = new AddCustomerController(
        makeAddCustomerValidation(),
        addCustomer,
    );

    return makeLogControllerDecorator(controller);
};
