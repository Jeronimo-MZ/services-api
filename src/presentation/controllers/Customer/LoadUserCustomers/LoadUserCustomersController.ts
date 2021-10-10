import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class LoadUserCustomersController
    implements Controller<LoadUserCustomersController.Request>
{
    constructor(private readonly validation: Validation) {}

    async handle(
        request: LoadUserCustomersController.Request,
    ): Promise<HttpResponse> {
        this.validation.validate(request);
        return undefined as any;
    }
}

export namespace LoadUserCustomersController {
    export type Request = {
        userId: string;
    };
}
