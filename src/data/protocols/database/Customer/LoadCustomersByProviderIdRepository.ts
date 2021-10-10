import { Customer } from "@/domain/models/Customer";

export interface LoadCustomersByProviderIdRepository {
    loadByProviderId(providerId: string): Promise<Customer[]>;
}
