import { DateValidator } from "@/validation/protocols/DateValidator";

export class DateValidatorSpy implements DateValidator {
    isDateValid = true;
    date: string;

    isValid(date: string): boolean {
        this.date = date;
        return this.isDateValid;
    }
}
