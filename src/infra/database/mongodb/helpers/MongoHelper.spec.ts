import { MongoHelper as sut } from "./MongoHelper";

describe("Mongo Helper", () => {
    beforeAll(async () => {
        await sut.connect(process.env.MONGO_URL as string);
    });

    afterAll(async () => {
        await sut.disconnect();
    });

    it("Should reconnect if mongodb client is down", async () => {
        let accountCollection = await sut.getCollection("accounts");
        expect(accountCollection).toBeTruthy();
        await sut.disconnect();
        accountCollection = await sut.getCollection("accounts");
        expect(accountCollection).toBeTruthy();
    });
});
