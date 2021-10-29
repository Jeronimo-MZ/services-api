import faker from "faker";

import { ValidationSpy } from "@/presentation/mocks/mockValidation";

import { UpdateUserAvatarController } from "./UpdateUserAvatarController";

type SutTypes = {
    sut: UpdateUserAvatarController;
    validationSpy: ValidationSpy;
};
const makeSut = (): SutTypes => {
    const validationSpy = new ValidationSpy();
    const sut = new UpdateUserAvatarController(validationSpy);

    return {
        sut,
        validationSpy,
    };
};

const mockRequest = (): UpdateUserAvatarController.Request => ({
    userId: faker.datatype.uuid(),
    file: {
        buffer: Buffer.from(faker.datatype.string()),
        mimeType: "image/jpeg",
    },
});

describe("UpdateUserAvatarController", () => {
    it("should call validation with correct values", async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request);
    });
});
