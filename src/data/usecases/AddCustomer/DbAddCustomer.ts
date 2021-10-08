import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { AddCustomerRepository } from "@/data/protocols/database/Customer";
import { LoadUserByIdRepository } from "@/data/protocols/database/User/LoadUserByIdRepository";
import { Customer } from "@/domain/models/Customer";
import { AddCustomer, AddCustomerParams } from "@/domain/usecases/AddCustomer";

export class DbAddCustomer implements AddCustomer {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly addCustomerRepository: AddCustomerRepository,
    ) {}

    async add({
        providerId,
        institution,
        name,
    }: AddCustomerParams): Promise<Customer> {
        const user = await this.loadUserByIdRepository.loadById(providerId);
        if (!user) throw new UnexpectedError();
        return await this.addCustomerRepository.add({
            institution,
            name,
            providerId,
        });
    }
}
