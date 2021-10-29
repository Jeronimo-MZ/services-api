import { InvalidParamError, MaxFileSizeError } from "@/presentation/errors";
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
        const maxFileSizeInBytes = this.maxSizeInMb * 1024 * 1024;
        if (input[this.field].length > maxFileSizeInBytes)
            return new MaxFileSizeError(this.maxSizeInMb);
        return null;
    }
}
