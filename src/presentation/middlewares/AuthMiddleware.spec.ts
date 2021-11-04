import faker from "faker";

import { AccessDeniedError } from "@/presentation/errors";
import { forbidden, ok, serverError } from "@/presentation/helpers";
import { LoadUserByTokenSpy } from "@/presentation/mocks";
import { throwError } from "@/tests/domain/mocks";

import { AuthMiddleware } from "./AuthMiddleware";

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

    it("should return 200 if LoadUserByToken returns a user", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(
            ok({
                userId: loadUserByTokenSpy.result?.id,
            }),
        );
    });
});
