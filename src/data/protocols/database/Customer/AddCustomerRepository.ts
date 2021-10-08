import { Customer } from "@/domain/models/Customer";
import { AddCustomerParams } from "@/domain/usecases/AddCustomer";

export interface AddCustomerRepository {
    add(data: AddCustomerParams): Promise<Customer>;
}
