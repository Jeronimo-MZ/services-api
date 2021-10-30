import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models";
import { AddCustomer, LoadUserCustomers } from "@/domain/usecases";

export class AddCustomerSpy implements AddCustomer {
    result: Customer = mockCustomerModel();
    params: AddCustomer.Params;

    async add(params: AddCustomer.Params): Promise<Customer> {
        this.params = params;
        return this.result;
    }
}

export class LoadUserCustomersSpy implements LoadUserCustomers {
    userId: string;
    result: Customer[] = [mockCustomerModel(), mockCustomerModel()];

    async load(userId: string): Promise<Customer[]> {
        this.userId = userId;
        return this.result;
    }
}
