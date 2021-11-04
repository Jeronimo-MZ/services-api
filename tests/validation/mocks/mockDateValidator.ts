import { DateValidator } from "@/validation/protocols";

export class DateValidatorSpy implements DateValidator {
    isDateValid = true;
    date: string;

    isValid(date: string): boolean {
        this.date = date;
        return this.isDateValid;
    }
}
