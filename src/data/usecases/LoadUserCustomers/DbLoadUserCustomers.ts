import { LoadCustomersByProviderIdRepository } from "@/data/protocols/database";
import { Customer } from "@/domain/models";
import { LoadUserCustomers } from "@/domain/usecases";

export class DbLoadUserCustomers implements LoadUserCustomers {
    constructor(
        private readonly loadCustomersByProviderIdRepository: LoadCustomersByProviderIdRepository,
    ) {}

    async load(userId: string): Promise<Customer[]> {
        return await this.loadCustomersByProviderIdRepository.loadByProviderId(
            userId,
        );
    }
}
