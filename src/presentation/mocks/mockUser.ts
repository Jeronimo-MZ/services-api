import faker from "faker";

import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/usecases/Authentication";
import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";

export class AddUserSpy implements AddUser {
    result: User | null = mockUserModel();
    params: AddUserParams;

    async add(params: AddUserParams): Promise<User | null> {
        this.params = params;
        return this.result;
    }
}

export class AuthenticationSpy implements Authentication {
    params: AuthenticationParams;
    result: string | null = faker.datatype.uuid();
    async auth(params: AuthenticationParams): Promise<string | null> {
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
