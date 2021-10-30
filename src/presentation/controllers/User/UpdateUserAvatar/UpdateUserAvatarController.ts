import { UpdateUserAvatar } from "@/domain/usecases";
import { badRequest, ok, serverError } from "@/presentation/helpers";
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
            const data = await this.updateUserAvatar.update({
                userId,
                file: {
                    buffer: file.buffer,
                    mimeType: file.mimetype,
                },
            });

            return ok(data);
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace UpdateUserAvatarController {
    export type Request = {
        userId: string;
        file: { buffer: Buffer; mimetype: string };
    };
}
