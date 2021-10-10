import faker from "faker";

import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { AddUser } from "@/domain/usecases/AddUser";
import { Authentication } from "@/domain/usecases/Authentication";
import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";

export class AddUserSpy implements AddUser {
    result: User | null = mockUserModel();
    params: AddUser.Params;

    async add(params: AddUser.Params): Promise<User | null> {
        this.params = params;
        return this.result;
    }
}

export class AuthenticationSpy implements Authentication {
    params: Authentication.Params;
    result: string | null = faker.datatype.uuid();
    async auth(params: Authentication.Params): Promise<string | null> {
        this.params = params;
        return this.result;
    }
}

export class LoadUserByTokenSpy implements LoadUserByToken {
    accessToken: string;
    result: User | null = mockUserModel();
    async load(accessToken: string): Promise<User | null> {
        this.accessToken = accessToken;
        return this.result;
    }
}
