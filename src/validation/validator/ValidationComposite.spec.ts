import faker from "faker";

import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { ValidationComposite } from "./ValidationComposite";

const field = faker.random.word();
type SutTypes = {
    sut: ValidationComposite;
    validationSpies: ValidationSpy[];
};

const makeSut = (): SutTypes => {
    const validationSpies = [
        new ValidationSpy(),
        new ValidationSpy(),
        new ValidationSpy(),
    ];
    const sut = new ValidationComposite(validationSpies);
    return {
        sut,
        validationSpies,
    };
};

describe("Validation Composite", () => {
    it("should return null if validation succeeds", () => {
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.random.word() });
        expect(error).toBeNull();
    });
});
