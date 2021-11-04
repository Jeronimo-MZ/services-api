import { Validation } from "@/presentation/protocols";
import {
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

export const makeAddCustomerValidation = (): Validation => {
    const validations: Validation[] = [];
    const requiredFields = ["userId", "name", "institution"];

    for (const field of requiredFields) {
        validations.push(new RequiredFieldValidation(field));
    }

    return new ValidationComposite(validations);
};
