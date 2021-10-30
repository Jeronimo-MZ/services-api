import {
    AddCustomerRepository,
    LoadCustomerByIdRepository,
    LoadCustomersByProviderIdRepository,
} from "@/data/protocols/database";
import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models";
import { AddCustomer } from "@/domain/usecases";

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

export class LoadCustomerByIdRepositorySpy
    implements LoadCustomerByIdRepository
{
    id: string;
    result: Customer | null = mockCustomerModel();

    async loadById(id: string): Promise<Customer | null> {
        this.id = id;
        return this.result;
    }
}
