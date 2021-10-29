export class InvalidMimeTypeError extends Error {
    constructor(allowed: string[]) {
        super(`Unsupported file. Allowed extensions: ${allowed.join(", ")}`);
        this.name = "InvalidMimeTypeError";
    }
}
