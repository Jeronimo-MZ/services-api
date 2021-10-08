import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { EmailValidator } from "@/validation/protocols/EmailValidator";

export class EmailValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator,
    ) {}

    validate(input: any): Error | null {
        const isValid = this.emailValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new InvalidParamError(this.fieldName);
        }
        return null;
    }
}
