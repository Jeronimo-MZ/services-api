import { Customer } from "@/domain/models/Customer";

export interface LoadUserCustomers {
    load(userId: string): Promise<Customer[]>;
}
