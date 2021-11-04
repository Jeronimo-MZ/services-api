import faker from "faker";

import { ServiceProvided } from "@/domain/models";
import { AddServiceProvided } from "@/domain/usecases";

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
