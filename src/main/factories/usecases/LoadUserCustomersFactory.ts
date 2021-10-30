import { DbLoadUserCustomers } from "@/data/usecases";
import { LoadUserCustomers } from "@/domain/usecases";
import { CustomerMongoRepository } from "@/infra/database/mongodb";

export const makeLoadUserCustomers = (): LoadUserCustomers => {
    const customerRepository = new CustomerMongoRepository();
    return new DbLoadUserCustomers(customerRepository);
};
