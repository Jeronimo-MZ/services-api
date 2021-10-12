import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";
import { DateValidator } from "@/validation/protocols";

export class DateValidation implements Validation {
    constructor(
        private readonly fieldName: string,
        private readonly dateValidator: DateValidator,
    ) {}

    validate(input: any): Error | null {
        const isValid = this.dateValidator.isValid(input[this.fieldName]);
        if (!isValid) {
            return new InvalidParamError(this.fieldName);
        }
        return null;
    }
}
