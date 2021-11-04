import { EmailValidatorAdapter } from "@/infra/validation";
import { makeLoginValidation } from "@/main/factories";
import { Validation } from "@/presentation/protocols";
import {
    EmailValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

jest.mock("@/validation/validators/ValidationComposite");

describe("Login Validation", () => {
    it("should call ValidationComposite with all validations", () => {
        makeLoginValidation();
        const validations: Validation[] = [];
        const fields = ["password", "email"];

        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }

        validations.push(
            new EmailValidation("email", new EmailValidatorAdapter()),
        );
        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
