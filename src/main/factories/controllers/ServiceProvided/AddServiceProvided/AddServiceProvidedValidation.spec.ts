import { Validation } from "@/presentation/protocols";
import { DateValidatorSpy } from "@/validation/mocks";
import {
    DateValidation,
    NotRequiredFieldValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

import { makeAddServiceProvidedValidation } from "./AddServiceProvidedValidation";

jest.mock("@/validation/validators/ValidationComposite");

describe("AddServiceProvided Validation", () => {
    it("should call ValidationComposite with all validations", () => {
        const dateValidator = new DateValidatorSpy();
        makeAddServiceProvidedValidation(dateValidator);
        const validations: Validation[] = [];
        const requiredFields = ["userId", "customerId", "name", "price"];
        for (const field of requiredFields) {
            validations.push(new RequiredFieldValidation(field));
        }
        validations.push(
            new NotRequiredFieldValidation(
                "paymentDate",
                new DateValidation("paymentDate", dateValidator),
            ),
        );

        expect(ValidationComposite).toHaveBeenCalledWith(validations);
    });
});
