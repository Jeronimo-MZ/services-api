import faker from "faker";

import { DateValidatorSpy } from "../mocks/mockDateValidator";
import { DateValidation } from "./DateValidation";

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
});
