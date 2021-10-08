import { mockCustomerModel } from "@/domain/mocks";
import { Customer } from "@/domain/models/Customer";
import { AddCustomerParams } from "@/domain/usecases/AddCustomer";

import { AddCustomerRepository } from "../protocols/database/Customer";

export class AddCustomerRepositorySpy implements AddCustomerRepository {
    params: AddCustomerParams;
    result: Customer = mockCustomerModel();

    async add(params: AddCustomerParams): Promise<Customer> {
        this.params = params;
        return this.result;
    }
}
