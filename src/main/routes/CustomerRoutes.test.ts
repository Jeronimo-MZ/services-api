import bcrypt from "bcrypt";
import { ObjectID } from "bson";
import faker from "faker";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";

import { Customer } from "@/domain/models";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";
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
        providerId: new ObjectID(providerId),
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

    describe("POST /customers", () => {
        it("should return 200 on success", async () => {
            const { token } = await makeUserTokenAndId();

            await request(app)
                .post("/api/customers")
                .set("x-access-token", token)
                .send({
                    name: faker.name.findName(),
                    institution: faker.random.alpha({ count: 5, upcase: true }),
                })
                .expect(200);
        });
    });

    describe("GET /customers", () => {
        it("should return 200 on success", async () => {
            const { token, id } = await makeUserTokenAndId();
            await makeCustomer(id);
            await request(app)
                .get("/api/customers")
                .set("x-access-token", token)
                .send()
                .expect(200);
        });
    });
});
