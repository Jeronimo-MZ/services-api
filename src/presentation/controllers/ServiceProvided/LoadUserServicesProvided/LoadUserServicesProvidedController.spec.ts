import faker from "faker";

import { throwError } from "@/domain/mocks";
import { InvalidParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { LoadUserServicesProvidedController } from "./LoadUserServicesProvided";

type SutTypes = {
    sut: LoadUserServicesProvidedController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new LoadUserServicesProvidedController(validationSpy);
    return {
        sut,
        validationSpy,
    };
};
const mockRequest = (): LoadUserServicesProvidedController.Request => {
    return {
        userId: faker.datatype.uuid(),
    };
};

describe("LoadUserServicesProvided Controller", () => {
    it("should call Validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });

    it("should return 400 if validation fails", async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = new InvalidParamError(faker.random.word());
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
});
