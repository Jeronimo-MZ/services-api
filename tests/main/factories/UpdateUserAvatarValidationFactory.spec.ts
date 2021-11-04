import { makeUpdateUserAvatarValidation } from "@/main/factories";
import { Validation } from "@/presentation/protocols";
import {
    AllowedMimeTypesValidation,
    MaxFileSizeValidation,
    ObjectValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";

jest.mock("@/validation/validators/ValidationComposite");

describe("UpdateUserAvatarValidation", () => {
    it("should call ValidationComposite with all validations", () => {
        const validations: Validation[] = [];
        const fields = ["file", "userId"];

        for (const field of fields) {
            validations.push(new RequiredFieldValidation(field));
        }
        const fileValidation = [
            new RequiredFieldValidation("buffer"),
            new RequiredFieldValidation("mimetype"),
            new MaxFileSizeValidation(5, "buffer"),
            new AllowedMimeTypesValidation(["jpg", "png"], "mimetype"),
        ];

        validations.push(new ObjectValidation("file", fileValidation));
        makeUpdateUserAvatarValidation();
        expect(ValidationComposite).toHaveBeenLastCalledWith(validations);
    });
});
