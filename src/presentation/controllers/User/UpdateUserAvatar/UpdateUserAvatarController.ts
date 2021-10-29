import { UpdateUserAvatar } from "@/domain/usecases/UpdateUserAvatar";
import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class UpdateUserAvatarController
    implements Controller<UpdateUserAvatarController.Request>
{
    constructor(
        private readonly validation: Validation,
        private readonly updateUserAvatar: UpdateUserAvatar,
    ) {}
    async handle(
        request: UpdateUserAvatarController.Request,
    ): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }
            const { userId, file } = request;
            await this.updateUserAvatar.update({ userId, file });

            return undefined as any;
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace UpdateUserAvatarController {
    export type Request = {
        userId: string;
        file: { buffer: Buffer; mimeType: string };
    };
}
