import { Validation } from "@/presentation/protocols";
import {
    AllowedMimeTypesValidation,
    MaxFileSizeValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";
import { ObjectValidation } from "@/validation/validators/ObjectValidation";

import { makeUpdateUserAvatarValidation } from "./UpdateUserAvatarValidationFactory";

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
