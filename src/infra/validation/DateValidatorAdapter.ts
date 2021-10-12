import validator from "validator";

import { DateValidator } from "@/validation/protocols";

export class DateValidatorAdapter implements DateValidator {
    isValid(date: string): boolean {
        validator.isDate(date);
        return false;
    }
}
