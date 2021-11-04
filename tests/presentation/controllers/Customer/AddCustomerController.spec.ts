import faker from "faker";

import { AddCustomerController } from "@/presentation/controllers";
import { InvalidParamError, ServerError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { AddCustomerSpy, ValidationSpy } from "@/tests/presentation/mocks";

type SutTypes = {
    sut: AddCustomerController;
    validationSpy: ValidationSpy;
    addCustomerSpy: AddCustomerSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const addCustomerSpy = new AddCustomerSpy();
    const sut = new AddCustomerController(validationSpy, addCustomerSpy);
    return {
        sut,
        validationSpy,
        addCustomerSpy,
    };
};
const mockRequest = (): AddCustomerController.Request => {
    return {
        institution: faker.name.findName(),
        name: faker.name.findName(),
        userId: faker.datatype.uuid(),
    };
};

describe("AddCustomer Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    it("should return 400 if validation fails", async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new InvalidParamError(faker.random.word());
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it("should return 500 if validation throws", async () => {
        const { sut, validationSpy } = makeSut();
        jest.spyOn(validationSpy, "validate").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should call AddCustomer with correct values", async () => {
        const { sut, addCustomerSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(addCustomerSpy.params).toEqual({
            institution: request.institution,
            name: request.name,
            providerId: request.userId,
        });
    });

    it("should return 500 if AddCustomer throws", async () => {
        const { sut, addCustomerSpy } = makeSut();
        jest.spyOn(addCustomerSpy, "add").mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should return 200 on success", async () => {
        const { sut, addCustomerSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(addCustomerSpy.result));
    });
});
