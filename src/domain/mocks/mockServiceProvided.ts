import faker from "faker";

import { AddServiceProvided } from "../usecases/AddServiceProvided";

export const mockAddServiceProvidedParams = (): AddServiceProvided.Params => ({
    customerId: faker.datatype.uuid(),
    providerId: faker.datatype.uuid(),
    name: faker.name.jobDescriptor(),
    price: faker.datatype.number(),
    details: faker.lorem.sentence(),
    paymentDate: faker.date.recent(),
});
