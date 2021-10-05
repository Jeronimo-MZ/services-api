import { badRequest } from "@/presentation/helpers/http/httpHelper";
import {
    Controller,
    HttpRequest,
    HttpResponse,
    Validation,
} from "@/presentation/protocols";

export class LoginController implements Controller {
    constructor(private readonly validation: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validation.validate(httpRequest.body);
        if (error) {
            return badRequest(error);
        }
        return null as unknown as HttpResponse;
    }
}
