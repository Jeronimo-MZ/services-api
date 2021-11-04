import faker from "faker";

import { InvalidParamError, ServerError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import {
    LoadUserServicesProvidedSpy,
    ValidationSpy,
} from "@/presentation/mocks";
import { throwError } from "@/tests/domain/mocks";

import { LoadUserServicesProvidedController } from "./LoadUserServicesProvidedController";

type SutTypes = {
    sut: LoadUserServicesProvidedController;
    validationSpy: ValidationSpy;
    loadUserServicesProvidedSpy: LoadUserServicesProvidedSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const loadUserServicesProvidedSpy = new LoadUserServicesProvidedSpy();
    const sut = new LoadUserServicesProvidedController(
        validationSpy,
        loadUserServicesProvidedSpy,
    );
    return {
        sut,
        validationSpy,
        loadUserServicesProvidedSpy,
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

    it("should call LoadUserServicesProvided with correct id", async () => {
        const { sut, loadUserServicesProvidedSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(loadUserServicesProvidedSpy.userId).toBe(request.userId);
    });

    it("should return 500 if LoadUserServicesProvided throws", async () => {
        const { sut, loadUserServicesProvidedSpy } = makeSut();
        jest.spyOn(loadUserServicesProvidedSpy, "load").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should return 200 on success", async () => {
        const { sut, loadUserServicesProvidedSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(loadUserServicesProvidedSpy.result));
    });
});
