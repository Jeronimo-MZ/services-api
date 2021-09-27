import { Validation } from "@/presentation/protocols";

export class ValidationComposite implements Validation {
    constructor(private readonly validations: Validation[]) {}

    validate(_input: any): Error | null {
        return null;
    }
}
