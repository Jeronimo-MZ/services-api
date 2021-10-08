import { AddCustomerRepository } from "@/data/protocols/database/Customer";
import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models/Customer";
import { AddCustomerParams } from "@/domain/usecases/AddCustomer";

export class AddCustomerRepositorySpy implements AddCustomerRepository {
    params: AddCustomerParams;
    result: Customer = mockCustomerModel();

    async add(params: AddCustomerParams): Promise<Customer> {
        this.params = params;
        return this.result;
    }
}
