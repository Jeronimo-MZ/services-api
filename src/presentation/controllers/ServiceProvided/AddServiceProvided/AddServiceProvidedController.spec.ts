import faker from "faker";

import { throwError } from "@/domain/mocks";
import { InvalidParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { AddServiceProviderSpy } from "@/presentation/mocks/mockServiceProvided";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";

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

describe("SignUp Controller", () => {
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
});
