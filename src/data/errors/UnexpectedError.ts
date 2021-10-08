export class UnexpectedError extends Error {
    constructor() {
        super("An Unexpected error occured");
        this.name = "UnexpectedError";
    }
}
