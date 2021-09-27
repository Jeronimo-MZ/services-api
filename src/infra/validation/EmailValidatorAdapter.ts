import validator from "validator";

import { EmailValidator } from "@/validation/protocols/EmailValidator";

export class EmailValidatorAdapter implements EmailValidator {
    isValid(email: string): boolean {
        validator.isEmail(email);
        return false;
    }
}
