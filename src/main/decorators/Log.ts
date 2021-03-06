import { LogErrorRepository } from "@/data/protocols/database";
import { Controller, HttpResponse } from "@/presentation/protocols";

import { pinoLogger } from "../adapters/PinoLoggerAdapter";

export class LogControllerDecorator implements Controller {
    constructor(
        private readonly controller: Controller,
        private readonly logErrorRepository: LogErrorRepository,
    ) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        const response = await this.controller.handle(httpRequest);
        if (response.statusCode === 500) {
            this.logErrorRepository.logError(response.body.stack);
            pinoLogger.error(response.body);
        }
        return response;
    }
}
