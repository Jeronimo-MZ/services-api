import { DbLoadUserCustomers } from "@/data/usecases/LoadUserCustomers/DbLoadUserCustomers";
import { LoadUserCustomers } from "@/domain/usecases/LoadUserCustomers";
import { CustomerMongoRepository } from "@/infra/database/mongodb/repositories/Customer/Customer";

export const makeLoadUserCustomers = (): LoadUserCustomers => {
    const customerRepository = new CustomerMongoRepository();
    return new DbLoadUserCustomers(customerRepository);
};
