import faker from "faker";

import { Customer } from "@/domain/models";
import { AddCustomer } from "@/domain/usecases";

export const mockCustomerModel = (): Customer => ({
    id: faker.datatype.uuid(),
    institution: faker.name.findName(),
    name: faker.name.findName(),
    phone: null,
    providerId: faker.datatype.uuid(),
});

export const mockAddCustomerParams = (): AddCustomer.Params => ({
    institution: faker.name.findName(),
    name: faker.name.findName(),
    providerId: faker.datatype.uuid(),
});
