import { Controller, HttpResponse } from "@/presentation/protocols";

export class LogControllerDecorator implements Controller {
    constructor(private readonly controller: Controller) {}

    async handle(httpRequest: any): Promise<HttpResponse> {
        return await this.controller.handle(httpRequest);
    }
}
