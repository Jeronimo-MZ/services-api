import faker from "faker";

import { MissingParamError } from "@/presentation/errors";

import { RequiredFieldValidation } from "./RequiredFieldValidation";

const field = faker.random.word();

const makeSut = (): RequiredFieldValidation => {
    return new RequiredFieldValidation(field);
};

describe("RequiredField Validation", () => {
    it("should return a MissingParamError if validation fails", () => {
        const sut = makeSut();
        const error = sut.validate({ invalidField: faker.random.word() });
        expect(error).toEqual(new MissingParamError(field));
    });

    it("should return null if validation succeeds", () => {
        const sut = makeSut();
        const error = sut.validate({ [field]: faker.random.word() });
        expect(error).toBeNull();
    });
});
