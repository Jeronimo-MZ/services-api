import faker from "faker";

import { throwError } from "@/domain/mocks";
import { MissingParamError, ServerError } from "@/presentation/errors";
import {
    badRequest,
    ok,
    serverError,
} from "@/presentation/helpers/http/httpHelper";
import { UpdateUserAvatarSpy } from "@/presentation/mocks/mockUser";
import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { UpdateUserAvatarController } from "./UpdateUserAvatarController";

type SutTypes = {
    sut: UpdateUserAvatarController;
    validationSpy: ValidationSpy;
    updateUserAvatarSpy: UpdateUserAvatarSpy;
};
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const updateUserAvatarSpy = new UpdateUserAvatarSpy();
    const sut = new UpdateUserAvatarController(
        validationSpy,
        updateUserAvatarSpy,
    );

    return {
        sut,
        validationSpy,
        updateUserAvatarSpy,
    };
};

const mockRequest = (): UpdateUserAvatarController.Request => ({
    userId: faker.datatype.uuid(),
    file: {
        buffer: Buffer.from(faker.datatype.string()),
        mimetype: "image/jpeg",
    },
});

describe("UpdateUserAvatarController", () => {
    it("should call validation with correct values", async () => {
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

    it("should return 500 if validation throws", async () => {
        const { sut, validationSpy } = makeSut();
        jest.spyOn(validationSpy, "validate").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should calls UpdateUserAvatar with correct values", async () => {
        const { sut, updateUserAvatarSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(updateUserAvatarSpy.file).toEqual({
            mimeType: request.file.mimetype,
            buffer: request.file.buffer,
        });
        expect(updateUserAvatarSpy.userId).toBe(request.userId);
    });

    it("should return 500 if UpdateUserAvatar throws", async () => {
        const { sut, updateUserAvatarSpy } = makeSut();
        jest.spyOn(updateUserAvatarSpy, "update").mockImplementationOnce(
            throwError,
        );
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(undefined)));
    });

    it("should return 200 if on success", async () => {
        const { sut, updateUserAvatarSpy } = makeSut();
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(ok(updateUserAvatarSpy.result));
    });
});
