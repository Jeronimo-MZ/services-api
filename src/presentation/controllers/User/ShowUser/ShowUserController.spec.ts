import faker from "faker";

import { throwError } from "@/domain/mocks";
import { MissingParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    serverError,
    unauthorized,
} from "@/presentation/helpers/http/httpHelper";
import { LoadUserByTokenSpy } from "@/presentation/mocks/mockUser";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { HttpRequest } from "@/presentation/protocols";

import { ShowUserController } from "./ShowUserController";

type SutTypes = {
    sut: ShowUserController;
    validationSpy: ValidationSpy;
    loadUserByTokenSpy: LoadUserByTokenSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const loadUserByTokenSpy = new LoadUserByTokenSpy();
    const sut = new ShowUserController(validationSpy, loadUserByTokenSpy);
    return {
        sut,
        validationSpy,
        loadUserByTokenSpy,
    };
};
const mockRequest = (): HttpRequest => {
    return {
        headers: {
            "x-access-token": faker.random.alphaNumeric(50),
        },
    };
};

describe("SignUp Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const httpRequest = mockRequest();
        await sut.handle(httpRequest);
        expect(validationSpy.input).toEqual(httpRequest.headers);
    });

    it("should return 400 if Validation returns an error", async () => {
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

    it("should call LoadUserByToken with correct token", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const httpRequest = mockRequest();
        await sut.handle(httpRequest);
        expect(loadUserByTokenSpy.accessToken).toBe(
            httpRequest.headers["x-access-token"],
        );
    });

    it("should return 401 if an invalid accessToken is provided", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        loadUserByTokenSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(unauthorized());
    });
});
