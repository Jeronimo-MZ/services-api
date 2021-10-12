import { LoadCustomerByIdRepository } from "@/data/protocols/database/Customer/LoadCustomerByIdRepository";
import { AddServiceProvidedRepository } from "@/data/protocols/database/ServiceProvided/AddServiceProvidedRepository";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

export class DbAddServiceProvided implements AddServiceProvided {
    constructor(
        private readonly loadCustomerByIdRepository: LoadCustomerByIdRepository,
        private readonly addServiceProvidedRepository: AddServiceProvidedRepository,
    ) {}
    async add({
        customerId,
        name,
        price,
        providerId,
        details,
        paymentDate,
    }: AddServiceProvided.Params): Promise<ServiceProvided | null> {
        const customer = await this.loadCustomerByIdRepository.loadById(
            customerId,
        );
        if (customer) {
            if (customer.providerId === providerId) {
                const serviceProvided =
                    await this.addServiceProvidedRepository.add({
                        customerId,
                        name,
                        price,
                        providerId,
                        details,
                        paymentDate,
                    });
                return serviceProvided;
            }
        }
        return null;
    }
}
