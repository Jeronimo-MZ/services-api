import { LoadCustomersByProviderIdRepositorySpy } from "@/data/mocks";
import { Customer } from "@/domain/models/Customer";
import { LoadUserCustomers } from "@/domain/usecases/LoadUserCustomers";

export class DbLoadUserCustomers implements LoadUserCustomers {
    constructor(
        private readonly loadCustomersByProviderIdRepository: LoadCustomersByProviderIdRepositorySpy,
    ) {}

    async load(userId: string): Promise<Customer[]> {
        this.loadCustomersByProviderIdRepository.loadByProviderId(userId);
        return [];
    }
}
