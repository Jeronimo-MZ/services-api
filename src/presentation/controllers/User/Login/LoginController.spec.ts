import faker from "faker";

import { MissingParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { HttpRequest } from "@/presentation/protocols";

import { LoginController } from "./LoginController";

type SutTypes = {
    sut: LoginController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new LoginController(validationSpy);
    return {
        sut,
        validationSpy,
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

    it("should return 400 if validation fails", async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new MissingParamError(faker.random.word());
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });
});
