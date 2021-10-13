import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoadUserServicesProvidedController
    implements Controller<LoadUserServicesProvidedController.Request>
{
    constructor(private readonly validation: Validation) {}

    async handle(
        request: LoadUserServicesProvidedController.Request,
    ): Promise<HttpResponse> {
        this.validation.validate(request);
        return undefined as any;
    }
}

export namespace LoadUserServicesProvidedController {
    export type Request = {
        userId: string;
    };
}
