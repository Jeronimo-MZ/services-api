import { mockAddUserParams } from "@/domain/mocks";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

import { UserMongoRepository } from "./User";

describe("User Mongo Repository", () => {
    beforeAll(async () => {
        await MongoHelper.connect(process.env.MONGO_URL as string);
    });
    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );
        await usersCollection.deleteMany({});
    });

    it("should return a user on success", async () => {
        const sut = new UserMongoRepository();
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
