import faker from "faker";

import { InvalidParamError, ServerError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import { AddServiceProviderSpy, ValidationSpy } from "@/presentation/mocks";
import { throwError } from "@/tests/domain/mocks";

import { AddServiceProvidedController } from "./AddServiceProvidedController";

type SutTypes = {
    sut: AddServiceProvidedController;
    validationSpy: ValidationSpy;
    addServiceProviderSpy: AddServiceProviderSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const addServiceProviderSpy = new AddServiceProviderSpy();
    const sut = new AddServiceProvidedController(
        validationSpy,
        addServiceProviderSpy,
    );
    return {
        sut,
        validationSpy,
        addServiceProviderSpy,
    };
};
const mockRequest = (): AddServiceProvidedController.Request => {
    return {
        customerId: faker.datatype.uuid(),
        userId: faker.datatype.uuid(),
        name: faker.name.jobDescriptor(),
        price: faker.datatype.number(),
        details: faker.lorem.sentence(),
        paymentDate: faker.date.recent(),
    };
};

describe("AddServiceProvided Controller", () => {
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

    it("should call AddServiceProvided with correct values", async () => {
        const { sut, addServiceProviderSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(addServiceProviderSpy.params).toEqual({
            customerId: request.customerId,
            name: request.name,
            price: request.price,
            providerId: request.userId,
            details: request.details,
            paymentDate: request.paymentDate,
        });
    });

    it("should return 500 if AddServiceProvided throws", async () => {
        const { sut, addServiceProviderSpy } = makeSut();
        jest.spyOn(addServiceProviderSpy, "add").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should return 400 if AddServiceProvided returns an error", async () => {
        const { sut, addServiceProviderSpy } = makeSut();
        addServiceProviderSpy.result = new Error();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(addServiceProviderSpy.result));
    });

    it("should return 200 on success", async () => {
        const { sut, addServiceProviderSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(addServiceProviderSpy.result));
    });
});
