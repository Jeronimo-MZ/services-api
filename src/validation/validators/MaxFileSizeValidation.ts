import { InvalidParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class MaxFileSizeValidation implements Validation {
    constructor(
        private readonly maxSizeInMb: number,
        private readonly field: string,
    ) {}

    validate(input: any): Error | null {
        if (!(input[this.field] instanceof Buffer)) {
            return new InvalidParamError(this.field);
        }
        return null;
    }
}
