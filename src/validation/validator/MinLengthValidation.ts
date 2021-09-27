import { Validation } from "@/presentation/protocols";

export class MinLengthValidation implements Validation {
    constructor(
        private readonly _field: string,
        private readonly _minLength: number,
    ) {}

    validate(_input: any): Error | null {
        return null;
    }
}
