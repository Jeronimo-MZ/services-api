import faker from "faker";

import { throwError } from "@/domain/mocks";
import { InvalidParamError } from "@/presentation/errors";
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
        const { sut } = makeSut();
        const error = sut.validate({ [field]: faker.internet.email() });
        expect(error).toBeNull();
    });

    it("should throw if EmailValidator throws", () => {
        const { sut, emailValidatorSpy } = makeSut();
        jest.spyOn(emailValidatorSpy, "isValid").mockImplementationOnce(
            throwError,
        );
        expect(sut.validate).toThrow();
    });

    it("should return an error if EmailValidator returns false", () => {
        const { sut, emailValidatorSpy } = makeSut();
        emailValidatorSpy.isEmailValid = false;

        const error = sut.validate({ [field]: faker.internet.email() });
        expect(error).toEqual(new InvalidParamError(field));
    });
});
