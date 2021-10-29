import faker from "faker";

import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { ObjectValidation } from "./ObjectValidation";

const field = faker.random.word();
type SutTypes = {
    sut: ObjectValidation;
    validationSpies: ValidationSpy[];
};

const makeSut = (): SutTypes => {
    const validationSpies = [
        new ValidationSpy(),
        new ValidationSpy(),
        new ValidationSpy(),
    ];
    const sut = new ObjectValidation(field, validationSpies);
    return {
        sut,
        validationSpies,
    };
};

describe("Validation Composite", () => {
    it("should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.helpers.userCard() });
        expect(error).toBeNull();
    });

    it("should return InvalidParamError if field is not a object", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.datatype.number() });
        expect(error).toEqual(new InvalidParamError(field));
    });

    it("should return MissingParam if field is not provided", () => {
        const { sut } = makeSut();
        const error = sut.validate({});
        expect(error).toEqual(new MissingParamError(field));
    });

    it("should return an error if any validation fails", () => {
        const { sut, validationSpies } = makeSut();
        validationSpies[1].error = new MissingParamError(field);
        const error = sut.validate({ [field]: faker.helpers.userCard() });
        expect(error).toEqual(validationSpies[1].error);
    });

    it("should return the first error if more than one validation fails", () => {
        const { sut, validationSpies } = makeSut();
        validationSpies[1].error = new Error();
        validationSpies[2].error = new MissingParamError(field);
        const error = sut.validate({ [field]: faker.helpers.userCard() });
        expect(error).toEqual(validationSpies[1].error);
    });
});
