import { InvalidMimeTypeError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export type Extension = "png" | "jpg";

export class AllowedMimeTypesValidation implements Validation {
    constructor(
        private readonly allowed: Extension[],
        private readonly field: string,
    ) {}

    validate(input: any): Error | null {
        if (this.isPng(input[this.field]) || this.isJpg(input[this.field]))
            return null;
        return new InvalidMimeTypeError(this.allowed);
    }

    private isPng(mimeType: string): boolean {
        return this.allowed.includes("png") && mimeType === "image/png";
    }

    private isJpg(mimeType: string): boolean {
        return this.allowed.includes("jpg") && /image\/jpe?g/.test(mimeType);
    }
}
