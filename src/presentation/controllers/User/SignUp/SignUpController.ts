import { AddUser } from "@/domain/usecases";
import { EmailInUseError } from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers";
import { Controller, HttpResponse, Validation } from "@/presentation/protocols";

export class SignUpController implements Controller<SignUpController.Request> {
    constructor(
        private readonly validation: Validation,
        private readonly addUser: AddUser,
    ) {}
    async handle(request: SignUpController.Request): Promise<HttpResponse> {
        try {
            const error = this.validation.validate(request);
            if (error) {
                return badRequest(error);
            }

            const { name, email, password } = request;
            const user = await this.addUser.add({ name, email, password });

            if (!user) {
                return forbidden(new EmailInUseError());
            }

            return ok({ user: { ...user, password: undefined } });
        } catch (error) {
            return serverError(error as Error);
        }
    }
}

export namespace SignUpController {
    export type Request = {
        name: string;
        email: string;
        password: string;
        passwordConfirmation: string;
    };
}
