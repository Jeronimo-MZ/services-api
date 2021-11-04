import { DbAddServiceProvided } from "@/data/usecases";
import {
    CustomerMongoRepository,
    ServiceProvidedMongoRepository,
} from "@/infra/database/mongodb";
import { DateValidatorAdapter } from "@/infra/validation";
import { makeLogControllerDecorator } from "@/main/factories";
import { AddServiceProvidedController } from "@/presentation/controllers";
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
