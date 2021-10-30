import { Customer } from "@/domain/models";
import { AddCustomer } from "@/domain/usecases";

export interface AddCustomerRepository {
    add(data: AddCustomer.Params): Promise<Customer>;
}
