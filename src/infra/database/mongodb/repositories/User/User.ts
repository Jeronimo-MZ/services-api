import { ObjectId } from "bson";

import {
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadUserByTokenRepository,
    UpdateAccessTokenRepository,
    UpdateUserAvatarRepository,
} from "@/data/protocols/database";
import { User } from "@/domain/models";
import { AddUser } from "@/domain/usecases";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";

export class UserMongoRepository
    implements
        AddUserRepository,
        LoadUserByEmailRepository,
        UpdateAccessTokenRepository,
        LoadUserByTokenRepository,
        LoadUserByIdRepository,
        UpdateUserAvatarRepository
{
    async add({ name, email, password }: AddUser.Params): Promise<User> {
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

        await usersCollection.insertOne(userData);

        return MongoHelper.map({
            ...userData,
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

    async updateAvatar({
        avatar,
        userId,
    }: UpdateUserAvatarRepository.Input): Promise<void> {
        const usersCollection = await MongoHelper.getCollection(
            CollectionNames.USER,
        );
        await usersCollection.updateOne(
            {
                _id: new ObjectId(userId),
            },
            {
                $set: {
                    avatar,
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

        return !user
            ? user
            : MongoHelper.map({
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

        if (!user) return null;

        return MongoHelper.map({
            ...user,
        });
    }
}
