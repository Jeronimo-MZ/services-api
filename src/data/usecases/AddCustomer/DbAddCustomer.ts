import { LoadUserByIdRepository } from "@/data/protocols/database/User/LoadUserByIdRepository";
import { Customer } from "@/domain/models/Customer";
import { AddCustomer, AddCustomerParams } from "@/domain/usecases/AddCustomer";

export class DbAddCustomer implements AddCustomer {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
    ) {}

    async add({ providerId }: AddCustomerParams): Promise<Customer> {
        await this.loadUserByIdRepository.loadById(providerId);
        return null as any;
    }
}
