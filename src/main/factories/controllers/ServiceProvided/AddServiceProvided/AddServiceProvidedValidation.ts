import { Validation } from "@/presentation/protocols";
import { DateValidator } from "@/validation/protocols";
import {
    DateValidation,
    NotRequiredFieldValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

export const makeAddServiceProvidedValidation = (
    dateValidator: DateValidator,
): Validation => {
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

    return new ValidationComposite(validations);
};
