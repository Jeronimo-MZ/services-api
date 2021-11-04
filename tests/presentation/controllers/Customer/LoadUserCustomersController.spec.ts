import faker from "faker";

import { LoadUserCustomersController } from "@/presentation/controllers";
import { InvalidParamError, ServerError } from "@/presentation/errors";
import { badRequest, ok, serverError } from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import {
    LoadUserCustomersSpy,
    ValidationSpy,
} from "@/tests/presentation/mocks";

type SutTypes = {
    sut: LoadUserCustomersController;
    validationSpy: ValidationSpy;
    loadUserCustomersSpy: LoadUserCustomersSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const loadUserCustomersSpy = new LoadUserCustomersSpy();
    const sut = new LoadUserCustomersController(
        validationSpy,
        loadUserCustomersSpy,
    );
    return {
        sut,
        validationSpy,
        loadUserCustomersSpy,
    };
};
const mockRequest = (): LoadUserCustomersController.Request => {
    return {
        userId: faker.datatype.uuid(),
    };
};

describe("LoadUserCustomers Controller", () => {
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

    it("should call LoadUserCustomers with correct userId", async () => {
        const { sut, loadUserCustomersSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(loadUserCustomersSpy.userId).toEqual(request.userId);
    });

    it("should return 500 if LoadUserCustomers throws", async () => {
        const { sut, loadUserCustomersSpy } = makeSut();
        jest.spyOn(loadUserCustomersSpy, "load").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should return 200 on success", async () => {
        const { sut, loadUserCustomersSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(loadUserCustomersSpy.result));
    });
});
