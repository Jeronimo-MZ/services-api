import { Customer } from "@/domain/models/Customer";

export type AddCustomerParams = {
    providerId: string;
    name: string;
    institution: string;
};

export interface AddCustomer {
    add(data: AddCustomerParams): Promise<Customer>;
}
