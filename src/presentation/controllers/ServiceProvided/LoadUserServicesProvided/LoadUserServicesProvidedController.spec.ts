import faker from "faker";

import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { LoadUserServicesProvidedController } from "./LoadUserServicesProvided";

type SutTypes = {
    sut: LoadUserServicesProvidedController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new LoadUserServicesProvidedController(validationSpy);
    return {
        sut,
        validationSpy,
    };
};
const mockRequest = (): LoadUserServicesProvidedController.Request => {
    return {
        userId: faker.datatype.uuid(),
    };
};

describe("LoadUserServicesProvided Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });
});
