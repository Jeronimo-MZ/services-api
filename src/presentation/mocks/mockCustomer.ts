import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models/Customer";
import { AddCustomer, AddCustomerParams } from "@/domain/usecases/AddCustomer";
import { LoadUserCustomers } from "@/domain/usecases/LoadUserCustomers";

export class AddCustomerSpy implements AddCustomer {
    result: Customer = mockCustomerModel();
    params: AddCustomerParams;

    async add(params: AddCustomerParams): Promise<Customer> {
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
