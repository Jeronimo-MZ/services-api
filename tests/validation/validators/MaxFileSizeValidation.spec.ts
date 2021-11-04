import faker from "faker";

import { InvalidParamError, MaxFileSizeError } from "@/presentation/errors";
import { MaxFileSizeValidation } from "@/validation/validators";

type SutTypes = {
    sut: MaxFileSizeValidation;
};
const field = faker.random.word();
const maxSizeInMb = 5;

const makeSut = (): SutTypes => {
    const sut = new MaxFileSizeValidation(maxSizeInMb, field);
    return {
        sut,
    };
};
describe("MaxFileSize Validation", () => {
    it("should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const buffer = Buffer.from(new ArrayBuffer(4 * 1024 * 1024));
        const error = sut.validate({ [field]: buffer });
        expect(error).toBeNull();
    });

    it("should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const buffer = Buffer.from(new ArrayBuffer(5 * 1024 * 1024));
        const error = sut.validate({ [field]: buffer });
        expect(error).toBeNull();
    });

    it("should return InvalidParamError if field is not a Buffer", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.datatype.number() });
        expect(error).toEqual(new InvalidParamError(field));
    });

    it("should return MaxFileSizeError if validation fails", () => {
        const { sut } = makeSut();
        const buffer = Buffer.from(new ArrayBuffer(6 * 1024 * 1024));
        const error = sut.validate({ [field]: buffer });
        expect(error).toEqual(new MaxFileSizeError(maxSizeInMb));
    });
});
