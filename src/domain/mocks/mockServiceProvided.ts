import faker from "faker";

import { ServiceProvided } from "../models/ServiceProvided";
import { AddServiceProvided } from "../usecases/AddServiceProvided";

export const mockAddServiceProvidedParams = (): AddServiceProvided.Params => ({
    customerId: faker.datatype.uuid(),
    providerId: faker.datatype.uuid(),
    name: faker.name.jobDescriptor(),
    price: faker.datatype.number(),
    details: faker.lorem.sentence(),
    paymentDate: faker.date.recent(),
});

export const mockServiceProvidedModel = (): ServiceProvided => ({
    id: faker.datatype.uuid(),
    customerId: faker.datatype.uuid(),
    providerId: faker.datatype.uuid(),
    name: faker.name.jobDescriptor(),
    price: faker.datatype.number(),
    details: faker.lorem.sentence(),
    paymentDate: faker.date.recent(),
});
