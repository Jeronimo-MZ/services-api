import { Customer } from "@/domain/models";

export interface LoadUserCustomers {
    load(userId: string): Promise<Customer[]>;
}
