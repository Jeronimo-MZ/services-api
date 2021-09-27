import { Validation } from "@/presentation/protocols";

import { EmailValidator } from "../protocols/EmailValidator";

export class EmailValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly emailValidator: EmailValidator,
    ) {}

    validate(input: any): Error | null {
        this.emailValidator.isValid(input[this.fieldName]);
        return null;
    }
}
