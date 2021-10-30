import bcrypt from "bcrypt";
import faker from "faker";
import jwt from "jsonwebtoken";
import { Collection } from "mongodb";
import request from "supertest";

import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";
import { DiskStorage } from "@/infra/storage";
import { app } from "@/main/config/app";
import { env } from "@/main/config/env";
import { setupRoutes } from "@/main/config/routes";

let usersCollection: Collection;

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

describe("User routes", () => {
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
        it("should return 200 on success", async () => {
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
        it("should return 200 on success", async () => {
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
    describe("GET /users/me", () => {
        beforeAll(() => {
            setupRoutes(app);
        });
        it("should return 200 on success", async () => {
            const { token } = await makeUserTokenAndId();

            await request(app)
                .get("/api/users/me")
                .set("x-access-token", token)
                .send()
                .expect(200);
        });
    });

    describe("PATCH /users/avatar", () => {
        beforeAll(() => {
            jest.mock("@/infra/storage/DiskStorage/DiskStorage");
            jest.spyOn(DiskStorage.prototype, "save").mockImplementation(
                async () => "any_url",
            );
        });

        afterAll(() => {
            jest.restoreAllMocks();
        });

        it("should return 403 if authorization header is not present", async () => {
            const { status } = await request(app).patch("/api/users/avatar");
            expect(status).toBe(403);
        });

        it("should return 200 with valid data", async () => {
            const { token } = await makeUserTokenAndId();
            const { status, body } = await request(app)
                .patch("/api/users/avatar")
                .set("x-access-token", token)
                .attach("avatar", Buffer.from("any_buffer"), {
                    filename: "any_name",
                    contentType: "image/png",
                });
            console.log(body);
            expect(status).toBe(200);
            expect(body).toEqual({
                avatarUrl: "any_url",
            });
        });
    });
});
