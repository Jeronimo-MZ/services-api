import bcrypt from "bcrypt";
import faker from "faker";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";

import { Customer } from "@/domain/models/Customer";
import { CollectionNames } from "@/infra/database/mongodb/helpers";
import { MongoHelper } from "@/infra/database/mongodb/helpers/MongoHelper";
import { app } from "@/main/config/app";
import { env } from "@/main/config/env";
import { setupRoutes } from "@/main/config/routes";

let usersCollection: Collection;
let customersCollection: Collection;

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

describe("User routes", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
        usersCollection = await MongoHelper.getCollection(CollectionNames.USER);
        customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        setupRoutes(app);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        await usersCollection.deleteMany({});
    });

    describe("POST /services", () => {
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
    });
});
