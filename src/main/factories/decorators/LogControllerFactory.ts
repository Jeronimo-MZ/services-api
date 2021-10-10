import { LogMongoRepository } from "@/infra/database/mongodb/repositories/Log/Log";
import { LogControllerDecorator } from "@/main/decorators/Log";
import { Controller } from "@/presentation/protocols";

export const makeLogControllerDecorator = (
    controller: Controller,
): Controller => {
    const logMongoRepository = new LogMongoRepository();

    return new LogControllerDecorator(controller, logMongoRepository);
};
