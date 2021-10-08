import bcrypt from "bcrypt";
import faker from "faker";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";

import { CollectionNames } from "@/infra/database/mongodb/helpers";
import { MongoHelper } from "@/infra/database/mongodb/helpers/MongoHelper";
import { app } from "@/main/config/app";
import { env } from "@/main/config/env";
import { setupRoutes } from "@/main/config/routes";

let usersCollection: Collection;

const makeUserToken = async () => {
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
    };
};

describe("User routes", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
        setupRoutes(app);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        usersCollection = await MongoHelper.getCollection(CollectionNames.USER);
        await usersCollection.deleteMany({});
    });

    describe("POST /customers", () => {
        it("should return 200 on success", async () => {
            const { token } = await makeUserToken();

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
});
