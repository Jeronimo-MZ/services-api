import { DbAddCustomer } from "@/data/usecases/AddCustomer/DbAddCustomer";
import { CustomerMongoRepository } from "@/infra/database/mongodb/repositories/Customer/Customer";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { AddCustomerController } from "@/presentation/controllers/Customer/AddCustomer/AddCustomerController";

import { makeAddCustomerValidation } from "./AddCustomerValidationFactory";

export const makeAddCustomerController = (): AddCustomerController => {
    const userMongoRepository = new UserMongoRepository();
    const customerMongoRepository = new CustomerMongoRepository();
    const addCustomer = new DbAddCustomer(
        userMongoRepository,
        customerMongoRepository,
    );
    return new AddCustomerController(makeAddCustomerValidation(), addCustomer);
};
