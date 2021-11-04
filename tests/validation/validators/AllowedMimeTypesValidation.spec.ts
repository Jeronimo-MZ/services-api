import faker from "faker";

import { InvalidMimeTypeError } from "@/presentation/errors";
import { AllowedMimeTypesValidation } from "@/validation/validators";

const field = faker.random.word();

describe("AllowedMimeType Validation", () => {
    it("should return InvalidMimeTypeError if value is invalid", () => {
        const sut = new AllowedMimeTypesValidation(["jpg"], field);
        const error = sut.validate({ [field]: "image/png" });
        expect(error).toEqual(new InvalidMimeTypeError(["jpg"]));
    });

    it("should return InvalidMimeTypeError if value is invalid", () => {
        const sut = new AllowedMimeTypesValidation(["png"], field);
        const error = sut.validate({ [field]: "image/jpg" });
        expect(error).toEqual(new InvalidMimeTypeError(["png"]));
    });

    it("should return null if value is valid", () => {
        const sut = new AllowedMimeTypesValidation(["png"], field);
        const error = sut.validate({ [field]: "image/png" });
        expect(error).toBeNull();
    });

    it("should return null if value is valid", () => {
        const sut = new AllowedMimeTypesValidation(["jpg"], field);
        const error = sut.validate({ [field]: "image/jpg" });
        expect(error).toBeNull();
    });

    it("should return null if value is valid", () => {
        const sut = new AllowedMimeTypesValidation(["jpg"], field);
        const error = sut.validate({ [field]: "image/jpeg" });
        expect(error).toBeNull();
    });
});
