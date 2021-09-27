export class ServerError extends Error {
    constructor(stack: string | undefined) {
        super("Internal Server Error");
        this.name = "Server Error";
        this.stack = stack;
    }
}
