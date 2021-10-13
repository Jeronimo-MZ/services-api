import { DbAddServiceProvided } from "@/data/usecases/AddServiceProvided/DbAddServiceProvided";
import { CustomerMongoRepository } from "@/infra/database/mongodb/repositories/Customer/Customer";
import { ServiceProvidedMongoRepository } from "@/infra/database/mongodb/repositories/ServiceProvided/ServiceProvided";
import { DateValidatorAdapter } from "@/infra/validation/DateValidatorAdapter";
import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { AddServiceProvidedController } from "@/presentation/controllers/ServiceProvided/AddServiceProvided/AddServiceProvidedController";
import { Controller } from "@/presentation/protocols";

import { makeAddServiceProvidedValidation } from "./AddServiceProvidedValidation";

export const makeAddServiceProvidedController = (): Controller => {
    const customerMongoRepository = new CustomerMongoRepository();
    const serviceProvidedRepository = new ServiceProvidedMongoRepository();
    const addServiceProvided = new DbAddServiceProvided(
        customerMongoRepository,
        serviceProvidedRepository,
    );
    const dateValidator = new DateValidatorAdapter();
    const controller = new AddServiceProvidedController(
        makeAddServiceProvidedValidation(dateValidator),
        addServiceProvided,
    );

    return makeLogControllerDecorator(controller);
};
