import { Customer } from "@/domain/models";

export interface LoadCustomerByIdRepository {
    loadById(id: string): Promise<Customer | null>;
}
