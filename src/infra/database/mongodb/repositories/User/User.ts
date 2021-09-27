import {
    AddUserRepository,
    LoadUserByEmailRepository,
} from "@/data/protocols/database/User";
import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";

import { CollectionNames } from "../../helpers/Collections";
import { MongoHelper } from "../../helpers/MongoHelper";

export class UserMongoRepository
    implements AddUserRepository, LoadUserByEmailRepository
{
    async add({ name, email, password }: AddUserParams): Promise<User> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );

        const result = await usersCollection.insertOne({
            name,
            email,
            password,
            isAdmin: false,
            avatar: null,
            occupation: null,
        });
        const user = (await usersCollection.findOne(
            result.insertedId,
        )) as Document;
        return MongoHelper.map({
            ...user,
        });
    }

    async loadByEmail(email: string): Promise<User | null> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );

        const user = (await usersCollection.findOne({ email })) as Document;

        if (!user) {
            return null;
        }

        return MongoHelper.map({
            ...user,
        });
    }
}
