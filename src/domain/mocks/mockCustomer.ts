import faker from "faker";

import { Customer } from "@/domain/models/Customer";
import { AddCustomerParams } from "@/domain/usecases/AddCustomer";

export const mockCustomerModel = (): Customer => ({
    id: faker.datatype.uuid(),
    institution: faker.name.findName(),
    name: faker.name.findName(),
    phone: null,
    providerId: faker.datatype.uuid(),
});

export const mockAddCustomerParams = (): AddCustomerParams => ({
    institution: faker.name.findName(),
    name: faker.name.findName(),
    providerId: faker.datatype.uuid(),
});
