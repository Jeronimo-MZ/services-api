import { Collection } from "mongodb";

import { mockAddCustomerParams } from "@/domain/mocks";
import { Customer } from "@/domain/models/Customer";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

import { CustomerMongoRepository } from "./Customer";

const makeSut = (): CustomerMongoRepository => new CustomerMongoRepository();

describe("Customer Mongo Repository", () => {
    let customersCollection: Collection;

    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        await customersCollection.deleteMany({});
    });

    describe("add()", () => {
        it("should return a Customer on success", async () => {
            const sut = makeSut();
            const addCustomerParams = mockAddCustomerParams();
            const customer: Customer = await sut.add(addCustomerParams);

            expect(customer).toBeTruthy();
            expect(customer.id).toBeTruthy();
            expect(customer.providerId).toBe(addCustomerParams.providerId);
            expect(customer.institution).toBe(addCustomerParams.institution);
            expect(customer.name).toBe(addCustomerParams.name);
            expect(customer.phone).toBeNull();
        });
    });
});
