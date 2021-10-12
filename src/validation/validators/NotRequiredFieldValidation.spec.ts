import faker from "faker";

import { NotRequiredFieldValidation } from "./NotRequiredFieldValidation";

const field = faker.random.word();

const makeSut = (): NotRequiredFieldValidation => {
    return new NotRequiredFieldValidation(field);
};

describe("NotRequiredField Validation", () => {
    it("should return null if field is not provided", () => {
        const sut = makeSut();
        const error = sut.validate({});
        expect(error).toBeNull();
    });
});
