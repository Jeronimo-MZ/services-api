import faker from "faker";

import { MissingParamError } from "@/presentation/errors/MissingParamError";
import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";
import { HttpRequest } from "@/presentation/protocols";

import { SignUpController } from "./SignUpController";

type SutTypes = {
    sut: SignUpController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new SignUpController(validationSpy);
    return {
        sut,
        validationSpy,
    };
};
const mockRequest = (): HttpRequest => {
    const password = faker.internet.password();
    return {
        body: {
            name: faker.name.findName(),
            email: faker.internet.email(),
            password,
            passwordConfirmation: password,
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
