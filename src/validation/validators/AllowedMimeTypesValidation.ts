import { Validation } from "@/presentation/protocols";

export type Extension = "png" | "jpg";

export class AllowedMimeTypesValidation implements Validation {
    constructor(
        private readonly allowed: Extension[],
        private readonly field: string,
    ) {}

    validate(_input: any): Error | null {
        return null;
    }
}
