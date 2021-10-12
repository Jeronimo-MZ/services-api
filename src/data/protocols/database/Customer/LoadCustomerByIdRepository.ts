import { Customer } from "@/domain/models/Customer";

export interface LoadCustomerByIdRepository {
    loadById(providerId: string): Promise<Customer | null>;
}
