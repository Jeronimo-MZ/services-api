import {
    AddServiceProvidedRepository,
    LoadCustomerByIdRepository,
} from "@/data/protocols/database";
import { ServiceProvided } from "@/domain/models";
import { AddServiceProvided } from "@/domain/usecases";
import { InvalidParamError } from "@/presentation/errors";

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
    }: AddServiceProvided.Params): Promise<ServiceProvided | Error> {
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
            return new InvalidParamError("providerId");
        } else {
            return new InvalidParamError("customerId");
        }
    }
}
