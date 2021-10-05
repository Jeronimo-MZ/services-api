import { EmailValidatorAdapter } from "@/infra/validation/EmailValidatorAdapter";
import { Validation } from "@/presentation/protocols";
import {
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

export const makeLoginValidation = (): Validation => {
    const validations: Validation[] = [];
    const requiredFields = ["password", "email"];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValidation(field));
    }

    validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

    return new ValidationComposite(validations);
};
