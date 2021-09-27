import { Collection } from "mongodb";

import { mockAddUserParams } from "@/domain/mocks";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

import { UserMongoRepository } from "./User";

const makeSut = (): UserMongoRepository => new UserMongoRepository();

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
        });
    });

    describe("loadByEmail", () => {
        it("Should return a user on success", async () => {
            const sut = makeSut();
            const addUserParams = mockAddUserParams();
            await usersCollection.insertOne({
                ...addUserParams,
                isAdmin: false,
                avatar: null,
                occupation: null,
            });
            const user = await sut.loadByEmail(addUserParams.email);

            expect(user).toBeTruthy();
            expect(user?.id).toBeTruthy();
            expect(user?.name).toBe(addUserParams.name);
            expect(user?.email).toBe(addUserParams.email);
            expect(user?.password).toBe(addUserParams.password);
            expect(user?.isAdmin).toBe(false);
            expect(user?.avatar).toBeNull();
            expect(user?.occupation).toBeNull();
            expect(user?.avatar).toBeNull();
        });
    });
});
