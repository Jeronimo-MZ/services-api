import { User } from "@/domain/models/User";
import { mockUserModel } from "@/domain/test/mockUser";

import { LoadUserByEmailRepository } from "../protocols/database/User/LoadUserByEmailRepository";

export const mockLoadUserByEmailRepository = (): LoadUserByEmailRepository => {
    class LoadUserByEmailRepositoryStub implements LoadUserByEmailRepository {
        async loadByEmail(_email: string): Promise<User | null> {
            return mockUserModel();
        }
    }

    return new LoadUserByEmailRepositoryStub();
};
