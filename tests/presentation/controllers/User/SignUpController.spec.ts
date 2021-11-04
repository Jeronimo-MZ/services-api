import faker from "faker";

import { SignUpController } from "@/presentation/controllers";
import {
    EmailInUseError,
    MissingParamError,
    ServerError,
} from "@/presentation/errors";
import { badRequest, forbidden, ok, serverError } from "@/presentation/helpers";
import { throwError } from "@/tests/domain/mocks";
import { AddUserSpy, ValidationSpy } from "@/tests/presentation/mocks";

type SutTypes = {
    sut: SignUpController;
    validationSpy: ValidationSpy;
    addUserSpy: AddUserSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const addUserSpy = new AddUserSpy();
    const sut = new SignUpController(validationSpy, addUserSpy);
    return {
        sut,
        validationSpy,
        addUserSpy,
    };
};
const mockRequest = (): SignUpController.Request => {
    const password = faker.internet.password();
    return {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password,
        passwordConfirmation: password,
    };
};

describe("SignUp Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    it("should return 400 if validation fails", async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new MissingParamError(faker.random.word());
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it("should call AddUser with correct values", async () => {
        const { sut, addUserSpy } = makeSut();

        const request = mockRequest();

        await sut.handle(request);
        expect(addUserSpy.params).toEqual({
            name: request.name,
            email: request.email,
            password: request.password,
        });
    });

    it("should return 500 if AddUser throws", async () => {
        const { sut, addUserSpy } = makeSut();
        jest.spyOn(addUserSpy, "add").mockImplementationOnce(throwError);
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should return 403 if AddUser returns null", async () => {
        const { sut, addUserSpy } = makeSut();
        addUserSpy.result = null;
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
    });

    it("should return 200 if valid data is provided", async () => {
        const { sut, addUserSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(
            ok({ user: { ...addUserSpy.result, password: undefined } }),
        );
    });
});
