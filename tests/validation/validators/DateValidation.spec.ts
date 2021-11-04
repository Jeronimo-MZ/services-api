import faker from "faker";

import { InvalidParamError } from "@/presentation/errors";
import { throwError } from "@/tests/domain/mocks";
import { DateValidatorSpy } from "@/tests/validation/mocks";
import { DateValidation } from "@/validation/validators";

const field = faker.random.word();

type SutTypes = {
    sut: DateValidation;
    dateValidatorSpy: DateValidatorSpy;
};

const makeSut = (): SutTypes => {
    const dateValidatorSpy = new DateValidatorSpy();
    const sut = new DateValidation(field, dateValidatorSpy);
    return {
        sut,
        dateValidatorSpy,
    };
};

describe("Date Validation", () => {
    it("should call DateValidator with correct date", () => {
        const { sut, dateValidatorSpy } = makeSut();
        const date = faker.date.recent().toString();
        sut.validate({ [field]: date });
        expect(dateValidatorSpy.date).toBe(date);
    });

    it("should return null if DateValidator returns true", () => {
        const { sut } = makeSut();
        const date = faker.date.recent().toString();
        const error = sut.validate({ [field]: date });
        expect(error).toBeNull();
    });

    it("should throw if DateValidator throws", () => {
        const { sut, dateValidatorSpy } = makeSut();
        jest.spyOn(dateValidatorSpy, "isValid").mockImplementationOnce(
            throwError,
        );
        expect(sut.validate).toThrow();
    });

    it("should return an error if DateValidator returns false", () => {
        const { sut, dateValidatorSpy } = makeSut();
        dateValidatorSpy.isDateValid = false;
        const date = faker.date.recent().toString();
        const error = sut.validate({ [field]: date });
        expect(error).toEqual(new InvalidParamError(field));
    });
});
