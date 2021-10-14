import bcrypt from "bcrypt";
import faker from "faker";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";

import { Customer } from "@/domain/models/Customer";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";
import { CollectionNames } from "@/infra/database/mongodb/helpers";
import { MongoHelper } from "@/infra/database/mongodb/helpers/MongoHelper";
import { app } from "@/main/config/app";
import { env } from "@/main/config/env";
import { setupRoutes } from "@/main/config/routes";

let usersCollection: Collection;
let customersCollection: Collection;
let servicesProvidedCollection: Collection;

const makeUserTokenAndId = async () => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.findName(),
        password: faker.internet.password(),
    };

    const { insertedId } = await usersCollection.insertOne({
        ...userData,
        password: await bcrypt.hash(userData.password, 12),
    });

    const token = jwt.sign({ data: insertedId.toHexString() }, env.secret, {
        expiresIn: 100,
    });
    await usersCollection.updateOne(
        { _id: insertedId },
        {
            $set: {
                accessToken: token,
            },
        },
    );
    return {
        token,
        id: insertedId.toHexString(),
    };
};

const makeCustomer = async (providerId: string): Promise<Customer> => {
    const customerData = {
        institution: faker.company.companyName(),
        name: faker.name.findName(),
        providerId: providerId,
        phone: null,
    };

    await customersCollection.insertOne(customerData);
    return MongoHelper.map(customerData);
};

const makeServiceProvided = async (
    providerId: string,
    customerId: string,
): Promise<ServiceProvided> => {
    const serviceProvidedData: AddServiceProvided.Params = {
        name: faker.name.findName(),
        customerId,
        providerId,
        price: faker.datatype.number(),
        details: faker.lorem.paragraph(),
    };

    await servicesProvidedCollection.insertOne(serviceProvidedData);
    return MongoHelper.map(serviceProvidedData);
};

describe("ServiceProvided routes", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
        usersCollection = await MongoHelper.getCollection(CollectionNames.USER);
        customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        servicesProvidedCollection = await MongoHelper.getCollection(
            CollectionNames.SERVICE_PROVIDED,
        );
        setupRoutes(app);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        await usersCollection.deleteMany({});
        await customersCollection.deleteMany({});
        await servicesProvidedCollection.deleteMany({});
    });

    describe("POST /api/services", () => {
        it("should return 200 on success", async () => {
            const { token, id } = await makeUserTokenAndId();
            const customer = await makeCustomer(id);

            await request(app)
                .post("/api/services")
                .set("x-access-token", token)
                .send({
                    customerId: customer.id,
                    name: faker.lorem.word(),
                    price: faker.datatype.number(),
                    details: faker.lorem.paragraph(),
                    paymentDate: "2020/12/25",
                })
                .expect(200);
        });

        describe("GET /api/services", () => {
            it("should return 200 on success", async () => {
                const { token, id } = await makeUserTokenAndId();
                const customer = await makeCustomer(id);
                makeServiceProvided(id, customer.id);
                makeServiceProvided(id, customer.id);
                const response = await request(app)
                    .get("/api/services")
                    .set("x-access-token", token)
                    .send()
                    .expect(200);

                console.log(response.body);
            });
        });
    });
});
