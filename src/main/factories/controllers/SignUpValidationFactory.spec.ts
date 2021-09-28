import { EmailValidatorAdapter } from "@/infra/validation/EmailValidatorAdapter";
import { Validation } from "@/presentation/protocols";
import {
    CompareFieldsValidation,
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

import { makeSignUpValidation } from "./SignUpValidationFactory";

jest.mock("@/validation/validators/ValidationComposite");

describe("SignUp Validation", () => {
    it("should call ValidationComposite with all validations", () => {
        makeSignUpValidation();
        const validations: Validation[] = [];
        const fields = [
            "name",
            "password",
            "name",
            "passwordConfirmation",
            "email",
        ];

        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        validations.push(
            new CompareFieldsValidation("password", "passwordConfirmation"),
        );

        validations.push(
            new EmailValidation("email", new EmailValidatorAdapter()),
        );
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
