import { DbAddCustomer } from "@/data/usecases";
import {
    CustomerMongoRepository,
    UserMongoRepository,
} from "@/infra/database/mongodb";
import { makeLogControllerDecorator } from "@/main/factories";
import { AddCustomerController } from "@/presentation/controllers";
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
