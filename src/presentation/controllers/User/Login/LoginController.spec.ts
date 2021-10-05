import faker from "faker";

import { throwError } from "@/domain/mocks";
import { MissingParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    serverError,
    unauthorized,
} from "@/presentation/helpers/http/httpHelper";
import { AuthenticationSpy } from "@/presentation/mocks/mockUser";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { HttpRequest } from "@/presentation/protocols";

import { LoginController } from "./LoginController";

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
const mockRequest = (): HttpRequest => {
    return {
        body: {
            email: faker.internet.email(),
            password: faker.internet.password(),
        },
    };
};

describe("SignUp Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const httpRequest = mockRequest();
        await sut.handle(httpRequest);
        expect(validationSpy.input).toEqual(httpRequest.body);
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
        const httpRequest = mockRequest();
        await sut.handle(httpRequest);
        expect(authenticationSpy.params).toEqual({
            email: httpRequest.body.email,
            password: httpRequest.body.password,
        });
    });

    it("should return 401 if invalid credentials are provided", async () => {
        const { sut, authenticationSpy } = makeSut();
        authenticationSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(unauthorized());
    });
});
