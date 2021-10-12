import { Validation } from "@/presentation/protocols";

export class NotRequiredFieldValidation implements Validation {
    constructor(
        private fieldName: string,
        private readonly validation: Validation,
    ) {}

    validate(input: any): Error | null {
        if (input[this.fieldName]) {
            return this.validation.validate(input);
        }
        return null;
    }
}
