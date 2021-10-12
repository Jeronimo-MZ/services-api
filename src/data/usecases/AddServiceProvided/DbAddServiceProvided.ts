import { LoadCustomerByIdRepository } from "@/data/protocols/database/Customer/LoadCustomerByIdRepository";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

export class DbAddServiceProvided implements AddServiceProvided {
    constructor(
        private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository,
    ) {}
    async add({
        customerId,
    }: AddServiceProvided.Params): Promise<ServiceProvided | null> {
        await this.loadCustomerByIdRepository.loadById(customerId);
        return null;
    }
}
