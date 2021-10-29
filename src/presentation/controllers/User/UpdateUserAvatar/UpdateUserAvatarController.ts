import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class UpdateUserAvatarController
    implements Controller<UpdateUserAvatarController.Request>
{
    constructor(private readonly validation: Validation) {}
    async handle(
        request: UpdateUserAvatarController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            return undefined as any;
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace UpdateUserAvatarController {
    export type Request = {
        userId: string;
        file?: { buffer: Buffer; mimeType: string };
    };
}
