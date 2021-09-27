import { mockUserModel } from "@/domain/mocks/mockUser";
import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";

import { AddUserRepository } from "../protocols/database/User/AddUserRepository";
import { LoadUserByEmailRepository } from "../protocols/database/User/LoadUserByEmailRepository";

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
