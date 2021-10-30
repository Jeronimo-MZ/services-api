import faker from "faker";
import { Collection } from "mongodb";

import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";
import { env } from "@/main/config/env";

import { LogMongoRepository } from "./Log";

const makeSut = (): LogMongoRepository => {
    return new LogMongoRepository();
};

describe("LogMongoRepository", () => {
    let errorCollection: Collection;
    beforeAll(async () => {
        await MongoHelper.connect(env.mongoUrl);
    });

    afterAll(async () => {
        await MongoHelper.disconnect();
    });

    beforeEach(async () => {
        errorCollection = await MongoHelper.getCollection(
            CollectionNames.ERROR,
        );
        await errorCollection.deleteMany({});
    });

    it("should create an error log on success", async () => {
        const sut = makeSut();
        await sut.logError(faker.random.words());
        const count = await errorCollection.countDocuments();
        expect(count).toBe(1);
    });
});
