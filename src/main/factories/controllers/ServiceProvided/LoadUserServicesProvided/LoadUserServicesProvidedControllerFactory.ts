import { DbLoadUserServicesProvider } from "@/data/usecases/LoadUserServicesProvided/DbLoadUserServicesProvider";
import { ServiceProvidedMongoRepository } from "@/infra/database/mongodb/repositories/ServiceProvided/ServiceProvided";
import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { LoadUserServicesProvidedController } from "@/presentation/controllers/ServiceProvided/LoadUserServicesProvided/LoadUserServicesProvidedController";
import { Controller } from "@/presentation/protocols";
import { RequiredFieldValidation } from "@/validation/validators";

export const makeLoadUserServicesProvidedController = (): Controller => {
    const serviceProvidedMongoRepository = new ServiceProvidedMongoRepository();
    const loadUserServicesProvided = new DbLoadUserServicesProvider(
        serviceProvidedMongoRepository,
    );
    const validation = new RequiredFieldValidation("userId");
    const controller = new LoadUserServicesProvidedController(
        validation,
        loadUserServicesProvided,
    );
    return makeLogControllerDecorator(controller);
};
