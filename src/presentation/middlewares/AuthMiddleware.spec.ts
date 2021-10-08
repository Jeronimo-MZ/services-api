import faker from "faker";

import { throwError } from "@/domain/mocks";

import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden, serverError } from "../helpers/http/httpHelper";
import { LoadUserByTokenSpy } from "../mocks/mockUser";
import { AuthMiddleware } from ".";

const mockRequest = (): AuthMiddleware.Request => ({
    accessToken: faker.random.alphaNumeric(50),
});

type SutTypes = {
    sut: AuthMiddleware;
    loadUserByTokenSpy: LoadUserByTokenSpy;
};

const makeSut = (): SutTypes => {
    const loadUserByTokenSpy = new LoadUserByTokenSpy();
    const sut = new AuthMiddleware(loadUserByTokenSpy);
    return {
        sut,
        loadUserByTokenSpy,
    };
};

describe("Auth Middleware", () => {
    it("should return 403 if no accessToken is provided", async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    it("should call LoadUserByToken with correct accessToken", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const httpRequest = mockRequest();
        await sut.handle(httpRequest);
        expect(loadUserByTokenSpy.accessToken).toBe(httpRequest.accessToken);
    });

    it("should return 403 if LoadUserByToken returns null", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        loadUserByTokenSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });

    it("should return 500 if LoadUserByToken throws", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        jest.spyOn(loadUserByTokenSpy, "load").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new Error()));
    });
});
