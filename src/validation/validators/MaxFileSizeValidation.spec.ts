import faker from "faker";

import { InvalidParamError } from "@/presentation/errors";

import { MaxFileSizeValidation } from "./MaxFileSizeValidation";

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

    it("should return InvalidParamError if field is not a Buffer", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.datatype.number() });
        expect(error).toEqual(new InvalidParamError(field));
    });
});
