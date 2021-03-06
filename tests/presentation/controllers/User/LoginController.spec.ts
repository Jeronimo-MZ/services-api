import faker from "faker";

import { LoginController } from "@/presentation/controllers";
import { MissingParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    ok,
    serverError,
    unauthorized,
} from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { AuthenticationSpy, ValidationSpy } from "@/tests/presentation/mocks";

type SutTypes = {
    sut: LoginController;
    validationSpy: ValidationSpy;
    authenticationSpy: AuthenticationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const authenticationSpy = new AuthenticationSpy();
    const sut = new LoginController(validationSpy, authenticationSpy);
    return {
        sut,
        validationSpy,
        authenticationSpy,
    };
};
const mockRequest = (): LoginController.Request => {
    return {
        email: faker.internet.email(),
        password: faker.internet.password(),
    };
};

describe("Login Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    it("should return 400 if validation returns an error", async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new MissingParamError(faker.random.word());
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

    it("should call Authentication with correct values", async () => {
        const { sut, authenticationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(authenticationSpy.params).toEqual({
            email: request.email,
            password: request.password,
        });
    });

    it("should return 401 if invalid credentials are provided", async () => {
        const { sut, authenticationSpy } = makeSut();
        authenticationSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(unauthorized());
    });

    it("should return 500 if Authentication throws", async () => {
        const { sut, authenticationSpy } = makeSut();
        jest.spyOn(authenticationSpy, "auth").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    it("should return 200 if valid credentials are provided", async () => {
        const { sut, authenticationSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(authenticationSpy.result));
    });
});
