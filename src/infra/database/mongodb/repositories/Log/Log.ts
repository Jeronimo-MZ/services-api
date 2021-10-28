import { LogErrorRepository } from "@/data/protocols/database/Log";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

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
