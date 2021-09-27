import {
    AddUserRepository,
    LoadUserByEmailRepository,
} from "@/data/protocols/database/User";
import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";

export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
    class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
        async loadByEmail(_email: string): Promise<User | null> {
            return mockUserModel();
        }
    }

    return new LoadUserByEmailRepositoryStub();
};

export const mockAddUserRepository = (): AddUserRepository => {
    class AddUserRepositoryStub implements AddUserRepository {
        async add(_userData: AddUserParams): Promise<User> {
            return mockUserModel();
        }
    }

    return new AddUserRepositoryStub();
};
