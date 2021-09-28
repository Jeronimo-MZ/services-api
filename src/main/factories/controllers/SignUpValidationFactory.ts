import { EmailValidatorAdapter } from "@/infra/validation/EmailValidatorAdapter";
import { Validation } from "@/presentation/protocols";
import {
    CompareFieldsValidation,
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

export const makeSignUpValidation = (): Validation => {
    const validations: Validation[] = [];
    const requiredFields = [
        "name",
        "password",
        "name",
        "passwordConfirmation",
        "email",
    ];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValidation(field));
    }

    validations.push(
        new CompareFieldsValidation("password", "passwordConfirmation"),
    );

    validations.push(new EmailValidation("email", new EmailValidatorAdapter()));

    return new ValidationComposite(validations);
};
