import { LogErrorRepository } from "@/data/protocols/database";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";

export class LogMongoRepository implements LogErrorRepository {
    async logError(stack: string): Promise<void> {
        const errorCollection = await MongoHelper.getCollection(
            CollectionNames.ERROR,
        );
        await errorCollection.insertOne({
            stack,
            date: new Date(),
        });
    }
}
