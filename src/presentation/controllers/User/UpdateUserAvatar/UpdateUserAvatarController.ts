import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class UpdateUserAvatarController
    implements Controller<UpdateUserAvatarController.Request>
{
    constructor(private readonly validation: Validation) {}
    handle(request: UpdateUserAvatarController.Request): Promise<HttpResponse> {
        this.validation.validate(request);
        return undefined as any;
    }
}

export namespace UpdateUserAvatarController {
    export type Request = {
        userId: string;
        file?: { buffer: Buffer; mimeType: string };
    };
}
