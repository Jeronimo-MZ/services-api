import { ObjectId } from "bson";

import {
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadUserByTokenRepository,
    UpdateAccessTokenRepository,
} from "@/data/protocols/database/User";
import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";

import { CollectionNames } from "../../helpers/Collections";
import { MongoHelper } from "../../helpers/MongoHelper";

export class UserMongoRepository
    implements
        AddUserRepository,
        LoadUserByEmailRepository,
        UpdateAccessTokenRepository,
        LoadUserByTokenRepository,
        LoadUserByIdRepository
{
    async add({ name, email, password }: AddUserParams): Promise<User> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );
        const userData: Omit<User, "id"> = {
            name,
            email,
            password,
            isAdmin: false,
            avatar: null,
            occupation: null,
            accessToken: null,
        };

        const result = await usersCollection.insertOne(userData);
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

        const user = await usersCollection.findOne({ email });

        if (!user) {
            return null;
        }

        return MongoHelper.map({
            ...user,
        });
    }

    async updateAccessToken(id: string, token: string): Promise<void> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );
        await usersCollection.updateOne(
            {
                _id: new ObjectId(id),
            },
            {
                $set: {
                    accessToken: token,
                },
            },
        );
    }

    async loadByToken(token: string): Promise<User | null> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );

        const user = await usersCollection.findOne({
            accessToken: token,
        });

        if (!user) {
            return null;
        }

        return MongoHelper.map({
            ...user,
        });
    }

    async loadById(id: string): Promise<User | null> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );

        const user = await usersCollection.findOne({
            _id: new ObjectId(id),
        });

        return MongoHelper.map({
            ...user,
        });
    }
}
