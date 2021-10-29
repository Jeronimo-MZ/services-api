export class MaxFileSizeError extends Error {
    constructor(maxSizeInMb: number) {
        super(`File upload limit is ${maxSizeInMb}MB`);
        this.name = "MaxFileSizeError";
    }
}
