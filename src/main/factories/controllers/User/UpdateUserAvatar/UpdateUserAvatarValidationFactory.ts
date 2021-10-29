import { Validation } from "@/presentation/protocols";
import {
    AllowedMimeTypesValidation,
    MaxFileSizeValidation,
    RequiredFieldValidation,
    ValidationComposite,
} from "@/validation/validators";
import { ObjectValidation } from "@/validation/validators/ObjectValidation";

export const makeUpdateUserAvatarValidation = (): Validation => {
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
    return new ValidationComposite(validations);
};
