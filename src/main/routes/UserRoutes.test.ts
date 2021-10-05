import bcrypt from "bcrypt";
import faker from "faker";
import { Collection } from "mongodb";
import request from "supertest";

import { CollectionNames } from "@/infra/database/mongodb/helpers";
import { MongoHelper } from "@/infra/database/mongodb/helpers/MongoHelper";
import { app } from "@/main/config/app";

import { setupRoutes } from "../config/routes";

describe("User routes", () => {
    let usersCollection: Collection;
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        usersCollection = await MongoHelper.getCollection(CollectionNames.USER);
        await usersCollection.deleteMany({});
    });

    describe("POST /signup", () => {
        beforeAll(() => {
            setupRoutes(app);
        });
        it("should return an 200 on success", async () => {
            const password = faker.internet.password();
            await request(app)
                .post("/api/signup")
                .send({
                    email: faker.internet.email(),
                    name: faker.name.findName(),
                    password,
                    passwordConfirmation: password,
                })
                .expect(200);
        });
    });

    describe("POST /login", () => {
        beforeAll(() => {
            setupRoutes(app);
        });
        it("should return an 200 on success", async () => {
            const userData = {
                email: faker.internet.email(),
                name: faker.name.findName(),
                password: faker.internet.password(),
            };

            await usersCollection.insertOne({
                ...userData,
                password: await bcrypt.hash(userData.password, 12),
            });

            await request(app)
                .post("/api/login")
                .send({
                    email: userData.email,
                    password: userData.password,
                })
                .expect(200);
        });
    });
});
