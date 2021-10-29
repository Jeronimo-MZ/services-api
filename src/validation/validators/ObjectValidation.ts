import { InvalidParamError, MissingParamError } from "@/presentation/errors";
import { Validation } from "@/presentation/protocols";

export class ObjectValidation implements Validation {
    constructor(
        private readonly fieldname: string,
        private readonly validations: Validation[],
    ) {}

    validate(object: any): Error | null {
        if (!object[this.fieldname])
            return new MissingParamError(this.fieldname);
        if (typeof object[this.fieldname] != "object")
            return new InvalidParamError(this.fieldname);

        for (const validation of this.validations) {
            const error = validation.validate(object[this.fieldname]);
            if (error) return error;
        }
        return null;
    }
}
