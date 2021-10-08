import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models/Customer";
import { AddCustomer, AddCustomerParams } from "@/domain/usecases/AddCustomer";

export class AddCustomerSpy implements AddCustomer {
    result: Customer = mockCustomerModel();
    params: AddCustomerParams;

    async add(params: AddCustomerParams): Promise<Customer> {
        this.params = params;
        return this.result;
    }
}
