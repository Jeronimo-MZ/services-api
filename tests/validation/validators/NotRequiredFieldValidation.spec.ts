import faker from "faker";

import { ValidationSpy } from "@/presentation/mocks";
import { NotRequiredFieldValidation } from "@/validation/validators";

const field = faker.random.word();
type SutTypes = {
    sut: NotRequiredFieldValidation;
    validationSpy: ValidationSpy;
};
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new NotRequiredFieldValidation(field, validationSpy);
    return {
        sut,
        validationSpy,
    };
};

describe("NotRequiredField Validation", () => {
    it("should return null if field is not provided", () => {
        const { sut, validationSpy } = makeSut();
        const error = sut.validate({});
        expect(error).toBeNull();
        expect(validationSpy.input).toBeUndefined();
    });

    it("should call Validation if field is provided", () => {
        const { sut, validationSpy } = makeSut();
        const input = { [field]: faker.random.word() };
        sut.validate(input);
        expect(validationSpy.input).toEqual(input);
    });

    it("should return null if Validation succeeds", () => {
        const { sut, validationSpy } = makeSut();
        const error = sut.validate({ [field]: faker.random.word() });
        expect(error).toBe(validationSpy.error);
    });

    it("should return an error if Validation fails", () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new Error();
        const error = sut.validate({ [field]: faker.random.word() });
        expect(error).toBe(validationSpy.error);
    });
});
