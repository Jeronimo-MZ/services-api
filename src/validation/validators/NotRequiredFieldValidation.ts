import { Validation } from "@/presentation/protocols";

export class NotRequiredFieldValidation implements Validation {
    constructor(private fieldName: string) {}

    validate(_input: any): Error | null {
        return null;
    }
}
