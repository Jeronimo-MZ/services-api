import faker from "faker";

import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { LoadUserCustomersController } from "./LoadUserCustomersController";

type SutTypes = {
    sut: LoadUserCustomersController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new LoadUserCustomersController(validationSpy);
    return {
        sut,
        validationSpy,
    };
};
const mockRequest = (): LoadUserCustomersController.Request => {
    return {
        userId: faker.datatype.uuid(),
    };
};

describe("SignUp Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });
});
