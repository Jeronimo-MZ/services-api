import faker from "faker";

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

describe("Email Validation", () => {
    it("should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.random.alphaNumeric(5) });
        expect(error).toBeNull();
    });
});
