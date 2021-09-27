import { AddUser } from "@/domain/usecases/AddUser";
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

export class SignUpController implements Controller {
    constructor(
        private readonly validation: Validation,
        private readonly addUser: AddUser,
    ) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(httpRequest.body);
            if (error) {
                return badRequest(error);
            }

            const { name, email, password } = httpRequest.body;
            await this.addUser.add({ name, email, password });
            return null as unknown as HttpResponse;
        } catch (error) {
            return serverError(error as Error);
        }
    }
}
