import bcrypt from "bcrypt";
import faker from "faker";
import { Collection } from "mongodb";

import { Customer } from "@/domain/models";
import {
    CollectionNames,
    CustomerMongoRepository,
    MongoHelper,
} from "@/infra/database/mongodb";
import { mockAddCustomerParams } from "@/tests/domain/mocks";

const makeSut = (): CustomerMongoRepository => new CustomerMongoRepository();
let customersCollection: Collection;
let usersCollection: Collection;

const makeUserId = async () => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
    };

    const { insertedId } = await usersCollection.insertOne({
        ...userData,
        password: await bcrypt.hash(userData.password, 12),
    });

    return {
        id: insertedId.toHexString(),
    };
};

const makeCustomer = async (providerId?: string): Promise<Customer> => {
    const customerData = {
        institution: faker.company.companyName(),
        name: faker.name.findName(),
        providerId: providerId || faker.datatype.uuid(),
        phone: null,
    };

    await customersCollection.insertOne(customerData);
    return MongoHelper.map(customerData);
};

describe("Customer Mongo Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
        customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        usersCollection = await MongoHelper.getCollection(CollectionNames.USER);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        await customersCollection.deleteMany({});
        await usersCollection.deleteMany({});
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

    describe("loadByProviderId()", () => {
        it("should returns an array of customers with the given providerId", async () => {
            const userIds = [await makeUserId(), await makeUserId()].map(
                ({ id }) => id,
            );
            const customers: Record<string, Customer[]> = {};

            for (const id of userIds) {
                customers[id] = [
                    await makeCustomer(id),
                    await makeCustomer(id),
                    await makeCustomer(id),
                ];
            }

            userIds.push((await makeUserId()).id);
            const sut = makeSut();
            let loadedCustomers = await sut.loadByProviderId(userIds[1]);
            expect(loadedCustomers).toEqual(customers[userIds[1]]);
            loadedCustomers = await sut.loadByProviderId(userIds[2]);
            expect(loadedCustomers).toEqual([]);
        });
    });

    describe("loadById()", () => {
        it("should return a customer on success", async () => {
            const sut = makeSut();
            const customer = await makeCustomer();
            const loadedCustomer = await sut.loadById(customer.id);
            expect(loadedCustomer).toEqual(customer);
        });

        it("should return null if loadById fails", async () => {
            const sut = makeSut();
            const customer = await sut.loadById(faker.datatype.string(12));
            expect(customer).toBeNull();
        });
    });
});
