import { Customer } from "@/domain/models/Customer";

export interface LoadCustomerByIdRepository {
    loadById(id: string): Promise<Customer | null>;
}
