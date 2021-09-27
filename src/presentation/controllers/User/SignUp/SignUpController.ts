import {
    Controller,
    HttpRequest,
    HttpResponse,
    Validation,
} from "@/presentation/protocols";

export class SignUpController implements Controller {
    constructor(private readonly validation: Validation) {}
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        this.validation.validate(httpRequest.body);
        return null as unknown as HttpResponse;
    }
}
