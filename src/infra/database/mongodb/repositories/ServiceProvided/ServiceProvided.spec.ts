import { Collection } from "mongodb";

import { mockAddServiceProvidedParams } from "@/domain/mocks";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

import { ServiceProvidedMongoRepository } from "./ServiceProvided";

const makeSut = (): ServiceProvidedMongoRepository =>
    new ServiceProvidedMongoRepository();
let serviceProvidedCollection: Collection;

describe("Customer Mongo Repository", () => {
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
});
