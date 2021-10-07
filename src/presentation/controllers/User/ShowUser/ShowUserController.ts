import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";
import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import {
    Controller,
    HttpRequest,
    HttpResponse,
    Validation,
} from "@/presentation/protocols";

export class ShowUserController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly loadUserByToken: LoadUserByToken,
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.headers);
            if (error) {
                return badRequest(error);
            }
            await this.loadUserByToken.load(
                httpRequest.headers["x-access-token"],
            );
            return null as unknown as HttpResponse;
        } catch (error) {
            return serverError(error as Error);
        }
    }
}
