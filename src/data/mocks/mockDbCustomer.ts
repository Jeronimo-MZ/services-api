import {
    AddCustomerRepository,
    LoadCustomersByProviderIdRepository,
} from "@/data/protocols/database/Customer";
import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models/Customer";
import { AddCustomer } from "@/domain/usecases/AddCustomer";

export class AddCustomerRepositorySpy implements AddCustomerRepository {
    params: AddCustomer.Params;
    result: Customer = mockCustomerModel();

    async add(params: AddCustomer.Params): Promise<Customer> {
        this.params = params;
        return this.result;
    }
}

export class LoadCustomersByProviderIdRepositorySpy
    implements LoadCustomersByProviderIdRepository
{
    providerId: string;
    result: Customer[] = [
        mockCustomerModel(),
        mockCustomerModel(),
        mockCustomerModel(),
    ];

    async loadByProviderId(providerId: string): Promise<Customer[]> {
        this.providerId = providerId;
        return this.result;
    }
}
