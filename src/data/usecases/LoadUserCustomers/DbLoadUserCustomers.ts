import { LoadCustomersByProviderIdRepository } from "@/data/protocols/database/Customer";
import { Customer } from "@/domain/models/Customer";
import { LoadUserCustomers } from "@/domain/usecases/LoadUserCustomers";

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
