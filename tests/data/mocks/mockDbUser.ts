import {
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByIdRepository,
    LoadUserByTokenRepository,
    UpdateAccessTokenRepository,
    UpdateUserAvatarRepository,
} from "@/data/protocols/database";
import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models";
import { AddUser } from "@/domain/usecases";

export class LoadUserByEmailRepositorySpy implements LoadUserByEmailRepository {
    email: string;
    result: User | null = mockUserModel();

    async loadByEmail(email: string): Promise<User | null> {
        this.email = email;
        return this.result;
    }
}

export class LoadUserByTokenRepositorySpy implements LoadUserByTokenRepository {
    token: string;
    result: User | null = mockUserModel();

    async loadByToken(token: string): Promise<User | null> {
        this.token = token;
        return this.result;
    }
}

export class LoadUserByIdRepositorySpy implements LoadUserByIdRepository {
    id: string;
    result: User | null = mockUserModel();

    async loadById(id: string): Promise<User | null> {
        this.id = id;
        return this.result;
    }
}

export class AddUserRepositorySpy implements AddUserRepository {
    params: AddUser.Params;
    result: User = mockUserModel();

    async add(params: AddUser.Params): Promise<User> {
        this.params = params;
        return this.result;
    }
}

export class UpdateAccessTokenRepositorySpy
    implements UpdateAccessTokenRepository
{
    id: string;
    token: string;

    async updateAccessToken(id: string, token: string): Promise<void> {
        this.id = id;
        this.token = token;
    }
}

export class UpdateUserAvatarRepositorySpy
    implements UpdateUserAvatarRepository
{
    userId: string;
    avatar: string;

    async updateAvatar({
        avatar,
        userId,
    }: UpdateUserAvatarRepository.Input): Promise<void> {
        this.userId = userId;
        this.avatar = avatar;
    }
}
