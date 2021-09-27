import faker from "faker";

import { EmailValidatorSpy } from "@/validation/mocks/mockEmailValidator";

import { EmailValidation } from "./EmailValidation";

const field = faker.random.word();

type SutTypes = {
    sut: EmailValidation;
    emailValidatorSpy: EmailValidatorSpy;
};

const makeSut = (): SutTypes => {
    const emailValidatorSpy = new EmailValidatorSpy();
    const sut = new EmailValidation(field, emailValidatorSpy);
    return {
        sut,
        emailValidatorSpy,
    };
};

describe("Email Validation", () => {
    it("should call EmailValidator with correct email", () => {
        const { sut, emailValidatorSpy } = makeSut();
        const email = faker.internet.email();
        sut.validate({ [field]: email });
        expect(emailValidatorSpy.email).toBe(email);
    });

    it("should return null if EmailValidator returns true", () => {
        const { sut, emailValidatorSpy } = makeSut();
        emailValidatorSpy.isEmailValid = false;
        const error = sut.validate({ [field]: faker.internet.email() });
        expect(error).toBeNull();
    });
});
