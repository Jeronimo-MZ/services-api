import faker from "faker";

import { ShowUserController } from "@/presentation/controllers";
import { MissingParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    ok,
    serverError,
    unauthorized,
} from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { LoadUserByTokenSpy, ValidationSpy } from "@/tests/presentation/mocks";

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
const mockRequest = (): ShowUserController.Request => {
    return {
        accessToken: faker.random.alphaNumeric(50),
    };
};

describe("ShowUser Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
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
        const request = mockRequest();
        await sut.handle(request);
        expect(loadUserByTokenSpy.accessToken).toBe(request.accessToken);
    });

    it("should return 401 if an invalid accessToken is provided", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        loadUserByTokenSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(unauthorized());
    });

    it("should return 500 if LoadUserByToken throws", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        jest.spyOn(loadUserByTokenSpy, "load").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });

    it("should return 200 if a valid accessToken is provided", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(
            ok({
                ...loadUserByTokenSpy.result,
                password: undefined,
                accessToken: undefined,
            }),
        );
    });
});
