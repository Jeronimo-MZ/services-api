import faker from "faker";
import validator from "validator";

import { DateValidatorAdapter } from "@/infra/validation";

jest.mock("validator", () => ({
    isDate(): boolean {
        return true;
    },
}));

const makeSut = (): DateValidatorAdapter => {
    const sut = new DateValidatorAdapter();
    return sut;
};
const date = faker.date.recent().toString();

describe("DateValidatorAdapter", () => {
    it("it should call validator with correct date", () => {
        const sut = makeSut();
        const isDateSpy = jest.spyOn(validator, "isDate");
        sut.isValid(date);
        expect(isDateSpy).toHaveBeenCalledWith(date);
    });

    it("should return false if validator returns false", () => {
        const sut = makeSut();
        jest.spyOn(validator, "isDate").mockReturnValueOnce(false);
        const isValid = sut.isValid(date);
        expect(isValid).toBe(false);
    });

    it("should return true if validator returns true", () => {
        const sut = makeSut();
        const isValid = sut.isValid(date);
        expect(isValid).toBe(true);
    });
});
