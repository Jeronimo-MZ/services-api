export class EmailInUseError extends Error {
    constructor() {
        super("Email already used");
        this.name = "EmailInUseError";
    }
}
