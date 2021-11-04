import { makeAddCustomerValidation } from "@/main/factories";
import { Validation } from "@/presentation/protocols";
import {
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

jest.mock("@/validation/validators/ValidationComposite");

describe("AddCustomer Validation", () => {
    it("should call ValidationComposite with all validations", () => {
        makeAddCustomerValidation();
        const validations: Validation[] = [];
        const requiredFields = ["userId", "name", "institution"];

        for (const field of requiredFields) {
            validations.push(new RequiredFieldValidation(field));
        }

        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
