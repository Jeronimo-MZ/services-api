import { Validation } from "@/presentation/protocols";
import { DateValidator } from "@/validation/protocols/DateValidator";

export class DateValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly dateValidator: DateValidator,
    ) {}

    validate(input: any): Error | null {
        this.dateValidator.isValid(input[this.fieldName]);
        return null;
    }
}
