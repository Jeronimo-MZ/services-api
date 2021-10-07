import { badRequest } from "@/presentation/helpers/http/httpHelper";
import {
    Controller,
    HttpRequest,
    HttpResponse,
    Validation,
} from "@/presentation/protocols";

export class ShowUserController implements Controller {
    constructor(private readonly validation: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        const error = this.validation.validate(httpRequest.headers);
        if (error) {
            return badRequest(error);
        }
        return null as unknown as HttpResponse;
    }
}
