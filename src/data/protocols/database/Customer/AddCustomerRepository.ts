import { Customer } from "@/domain/models/Customer";
import { AddCustomer } from "@/domain/usecases/AddCustomer";

export interface AddCustomerRepository {
    add(data: AddCustomer.Params): Promise<Customer>;
}
