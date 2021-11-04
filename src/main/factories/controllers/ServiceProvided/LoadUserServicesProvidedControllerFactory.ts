import { DbLoadUserServicesProvider } from "@/data/usecases";
import { ServiceProvidedMongoRepository } from "@/infra/database/mongodb";
import { makeLogControllerDecorator } from "@/main/factories";
import { LoadUserServicesProvidedController } from "@/presentation/controllers";
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
