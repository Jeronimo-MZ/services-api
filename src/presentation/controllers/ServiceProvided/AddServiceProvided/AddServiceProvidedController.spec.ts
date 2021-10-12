import faker from "faker";

import { InvalidParamError } from "@/presentation/errors";
import { badRequest } from "@/presentation/helpers/http/httpHelper";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { AddServiceProvidedController } from "./AddServiceProvidedController";

type SutTypes = {
    sut: AddServiceProvidedController;
    validationSpy: ValidationSpy;
};

const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new AddServiceProvidedController(validationSpy);
    return {
        sut,
        validationSpy,
    };
};
const mockRequest = (): AddServiceProvidedController.Request => {
    return {
        customerId: faker.datatype.uuid(),
        providerId: faker.datatype.uuid(),
        name: faker.name.jobDescriptor(),
        price: faker.datatype.number(),
        details: faker.lorem.sentence(),
        paymentDate: faker.date.recent(),
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
        validationSpy.error = new InvalidParamError(faker.random.word());
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });
});
