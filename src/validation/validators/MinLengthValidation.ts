import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class MinLengthValidation implements Validation {
    constructor(
        private readonly field: string,
        private readonly minLength: number,
    ) {}

    validate(input: any): Error | null {
        if (typeof input[this.field] !== "string") {
            return new InvalidParamError(this.field);
        }

        if (input[this.field].length < this.minLength) {
            return new InvalidParamError(this.field);
        }

        return null;
    }
}
