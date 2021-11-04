import { UnexpectedError } from "@/data/errors";
import {
    AddCustomerRepository,
    LoadUserByIdRepository,
} from "@/data/protocols/database";
import { Customer } from "@/domain/models";
import { AddCustomer } from "@/domain/usecases";

export class DbAddCustomer implements AddCustomer {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly addCustomerRepository: AddCustomerRepository,
    ) {}

    async add({
        providerId,
        institution,
        name,
    }: AddCustomer.Params): Promise<Customer> {
        const user = await this.loadUserByIdRepository.loadById(providerId);
        if (!user) throw new UnexpectedError();
        return await this.addCustomerRepository.add({
            institution,
            name,
            providerId,
        });
    }
}
