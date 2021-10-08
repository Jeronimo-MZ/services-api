import faker from "faker";

import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { AddCustomerController } from "./AddCustomerController";

type SutTypes = {
    sut: AddCustomerController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new AddCustomerController(validationSpy);
    return {
        sut,
        validationSpy,
    };
};
const mockRequest = (): AddCustomerController.Request => {
    return {
        institution: faker.name.findName(),
        name: faker.name.findName(),
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
