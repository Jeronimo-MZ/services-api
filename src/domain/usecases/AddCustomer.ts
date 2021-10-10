import { Customer } from "@/domain/models/Customer";

export interface AddCustomer {
    add(data: AddCustomer.Params): Promise<Customer>;
}

export namespace AddCustomer {
    export type Params = {
        providerId: string;
        name: string;
        institution: string;
    };
}
