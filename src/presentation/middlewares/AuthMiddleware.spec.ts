import { AccessDeniedError } from "../errors/AccessDeniedError";
import { forbidden } from "../helpers/http/httpHelper";
import { AuthMiddleware } from ".";

type SutTypes = {
    sut: AuthMiddleware;
};

const makeSut = (): SutTypes => {
    const sut = new AuthMiddleware();
    return {
        sut,
    };
};

describe("Auth Middleware", () => {
    it("should return 403 if no accessToken is provided", async () => {
        const { sut } = makeSut();
        const httpResponse = await sut.handle({});
        expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
    });
});
