import faker from "faker";
import validator from "validator";

import { EmailValidatorAdapter } from "./EmailValidatorAdapter";

jest.mock("validator", () => ({
    isEmail(): boolean {
        return true;
    },
}));

const makeSut = (): EmailValidatorAdapter => {
    const sut = new EmailValidatorAdapter();
    return sut;
};

describe("EmailValidatorAdapter", () => {
    it("it should call validator with correct email", () => {
        const sut = makeSut();
        const email = faker.internet.email();
        const isEmailSpy = jest.spyOn(validator, "isEmail");
        sut.isValid(email);
        expect(isEmailSpy).toHaveBeenCalledWith(email);
    });

    it("should return false if validator returns false", () => {
        const sut = makeSut();
        jest.spyOn(validator, "isEmail").mockReturnValueOnce(false);
        const isValid = sut.isValid(faker.internet.email());
        expect(isValid).toBe(false);
    });

    it("should return true if validator returns true", () => {
        const sut = makeSut();
        const isValid = sut.isValid("valid_email@mail.com");
        expect(isValid).toBe(true);
    });
});
