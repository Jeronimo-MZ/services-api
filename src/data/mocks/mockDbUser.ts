import {
    AddUserRepository,
    LoadUserByEmailRepository,
    LoadUserByTokenRepository,
    UpdateAccessTokenRepository,
} from "@/data/protocols/database/User";
import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";

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

export class AddUserRepositorySpy implements AddUserRepository {
    params: AddUserParams;
    result: User = mockUserModel();

    async add(params: AddUserParams): Promise<User> {
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
