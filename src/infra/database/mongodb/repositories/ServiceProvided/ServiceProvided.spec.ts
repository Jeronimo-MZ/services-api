import faker from "faker";
import { Collection } from "mongodb";

import { mockAddServiceProvidedParams } from "@/domain/mocks";
import { ServiceProvided } from "@/domain/models";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";

import { ServiceProvidedMongoRepository } from "./ServiceProvided";

const makeSut = (): ServiceProvidedMongoRepository =>
    new ServiceProvidedMongoRepository();
let serviceProvidedCollection: Collection;

const makeServiceProvided = async (
    providerId?: string,
): Promise<ServiceProvided> => {
    const serviceProvided = mockAddServiceProvidedParams();
    if (providerId) {
        serviceProvided.providerId = providerId;
    }
    await serviceProvidedCollection.insertOne(serviceProvided);

    return MongoHelper.map(serviceProvided);
};

describe("ServiceProvided Mongo Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);

        serviceProvidedCollection = await MongoHelper.getCollection(
            CollectionNames.SERVICE_PROVIDED,
        );
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        await serviceProvidedCollection.deleteMany({});
    });

    describe("add()", () => {
        it("should return a ServiceProvided on success", async () => {
            const sut = makeSut();
            const addServiceProvidedParams = mockAddServiceProvidedParams();
            const serviceProvided: ServiceProvided = await sut.add(
                addServiceProvidedParams,
            );

            expect(serviceProvided).toBeTruthy();
            expect(serviceProvided.id).toBeTruthy();
            expect(serviceProvided.providerId).toBe(
                addServiceProvidedParams.providerId,
            );
            expect(serviceProvided.customerId).toBe(serviceProvided.customerId);
            expect(serviceProvided.details).toBe(serviceProvided.details);
            expect(serviceProvided.name).toBe(serviceProvided.name);
            expect(serviceProvided.paymentDate).toBe(
                serviceProvided.paymentDate,
            );
            expect(serviceProvided.price).toBe(serviceProvided.price);
        });
    });

    describe("loadByProviderId()", () => {
        it("should returns an array of ServicesProvided with the given providerId", async () => {
            const services = [await makeServiceProvided()];
            for (let i = 0; i < 3; i++) {
                services.push(
                    await makeServiceProvided(services[0].providerId),
                );
            }
            const sut = makeSut();
            let loadedServices = await sut.loadByProviderId(
                services[0].providerId,
            );
            expect(loadedServices).toEqual(services);
            loadedServices = await sut.loadByProviderId(faker.datatype.uuid());
        });
    });
});
