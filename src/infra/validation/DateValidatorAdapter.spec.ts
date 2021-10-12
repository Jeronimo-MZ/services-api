import faker from "faker";
import validator from "validator";

import { DateValidatorAdapter } from "./DateValidatorAdapter";

jest.mock("validator", () => ({
    isDate(): boolean {
        return true;
    },
}));

const makeSut = (): DateValidatorAdapter => {
    const sut = new DateValidatorAdapter();
    return sut;
};

describe("DateValidatorAdapter", () => {
    it("it should call validator with correct date", () => {
        const sut = makeSut();
        const date = faker.date.recent().toString();
        const isDateSpy = jest.spyOn(validator, "isDate");
        sut.isValid(date);
        expect(isDateSpy).toHaveBeenCalledWith(date);
    });
});
