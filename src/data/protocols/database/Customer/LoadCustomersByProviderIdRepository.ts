import { Customer } from "@/domain/models";

export interface LoadCustomersByProviderIdRepository {
    loadByProviderId(providerId: string): Promise<Customer[]>;
}
