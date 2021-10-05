import faker from "faker";

import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/usecases/Authentication";

export class AdduserSpy implements AddUser {
    result: User | null = mockUserModel();
    params: AddUserParams;

    async add(params: AddUserParams): Promise<User | null> {
        this.params = params;
        return this.result;
    }
}

export class AuthenticationSpy implements Authentication {
    params: AuthenticationParams;
    result = faker.datatype.uuid();
    async auth(params: AuthenticationParams): Promise<string | null> {
        this.params = params;
        return this.result;
    }
}
