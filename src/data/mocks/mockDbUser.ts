import {
    AddUserRepository,
    LoadUserByEmailRepository,
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

export class AddUserRepositorySpy implements AddUserRepository {
    params: AddUserParams;
    result: User = mockUserModel();

    async add(params: AddUserParams): Promise<User> {
        this.params = params;
        return this.result;
    }
}
