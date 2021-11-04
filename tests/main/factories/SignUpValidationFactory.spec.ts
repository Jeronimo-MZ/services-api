import { EmailValidatorAdapter } from "@/infra/validation";
import { makeSignUpValidation } from "@/main/factories";
import { Validation } from "@/presentation/protocols";
import {
    CompareFieldsValidation,
    EmailValidation,
    MinLengthValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

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

        validations.push(new MinLengthValidation("password", 6));

        validations.push(
            new EmailValidation("email", new EmailValidatorAdapter()),
        );
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
