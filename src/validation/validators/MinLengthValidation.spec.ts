import faker from "faker";

import { InvalidParamError } from "@/presentation/errors";

import { MinLengthValidation } from "./MinLengthValidation";

const field = faker.random.word();
const minLength = 5;

type SutTypes = {
    sut: MinLengthValidation;
};

const makeSut = (): SutTypes => {
    const sut = new MinLengthValidation(field, minLength);
    return {
        sut,
    };
};

describe("Min Length Validation", () => {
    it("should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
        expect(error).toBeNull();
    });

    it("should return InvalidParamError if field is not string", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.datatype.number() });
        expect(error).toEqual(new InvalidParamError(field));
    });

    it("should return InvalidParamError if validation fails", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.random.alphaNumeric(4) });
        expect(error).toEqual(new InvalidParamError(field));
    });
});
