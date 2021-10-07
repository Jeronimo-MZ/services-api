import faker from "faker";

import { MissingParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { HttpRequest } from "@/presentation/protocols";

import { ShowUserController } from "./ShowUserController";

type SutTypes = {
    sut: ShowUserController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new ShowUserController(validationSpy);
    return {
        sut,
        validationSpy,
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
});
