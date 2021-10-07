import faker from "faker";
import { Collection } from "mongodb";

import { mockAddUserParams } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

import { UserMongoRepository } from "./User";

const makeSut = (): UserMongoRepository => new UserMongoRepository();
const token = faker.random.alphaNumeric(50);

describe("User Mongo Repository", () => {
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

    describe("add()", () => {
        it("should return a user on success", async () => {
            const sut = makeSut();
            const userParams = mockAddUserParams();
            const user = await sut.add(userParams);

            expect(user).toBeTruthy();
            expect(user.id).toBeTruthy();
            expect(user.name).toBe(userParams.name);
            expect(user.email).toBe(userParams.email);
            expect(user.password).toBe(userParams.password);
            expect(user.isAdmin).toBe(false);
            expect(user.avatar).toBeNull();
            expect(user.occupation).toBeNull();
            expect(user.avatar).toBeNull();
            expect(user.accessToken).toBeNull();
        });
    });

    describe("loadByEmail()", () => {
        it("should return a user on success", async () => {
            const sut = makeSut();
            const addUserParams = mockAddUserParams();
            const { insertedId } = await usersCollection.insertOne(
                addUserParams,
            );
            const user = await sut.loadByEmail(addUserParams.email);

            expect(user).toBeTruthy();
            expect(user?.id).toBe(insertedId.toHexString());
            expect(user?.name).toBe(addUserParams.name);
            expect(user?.email).toBe(addUserParams.email);
            expect(user?.password).toBe(addUserParams.password);
        });

        it("should return null if loadByEmail fails", async () => {
            const sut = makeSut();
            const user = await sut.loadByEmail(faker.internet.email());
            expect(user).toBeNull();
        });
    });

    describe("updateAccessToken()", () => {
        it("should update the user accessToken on success", async () => {
            const sut = makeSut();
            const { insertedId } = await usersCollection.insertOne(
                mockAddUserParams(),
            );
            let user = (await usersCollection.findOne({
                _id: insertedId,
            })) as User;
            expect(user.accessToken).toBeFalsy();

            const accessToken = faker.datatype.uuid();
            await sut.updateAccessToken(insertedId.toHexString(), accessToken);
            user = (await usersCollection.findOne({
                _id: insertedId,
            })) as User;
            expect(user).toBeTruthy();
            expect(user.accessToken).toBe(accessToken);
        });
    });

    describe("loadByToken()", () => {
        it("should return a user on success", async () => {
            const sut = makeSut();
            const addUserParams = mockAddUserParams();
            const { insertedId } = await usersCollection.insertOne({
                ...addUserParams,
                accessToken: token,
            });
            const user = await sut.loadByToken(token);

            expect(user).toBeTruthy();
            expect(user?.id).toBe(insertedId.toHexString());
            expect(user?.name).toBe(addUserParams.name);
            expect(user?.email).toBe(addUserParams.email);
            expect(user?.password).toBe(addUserParams.password);
            expect(user?.accessToken).toBe(token);
        });
    });
});
