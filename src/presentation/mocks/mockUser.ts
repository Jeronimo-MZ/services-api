import { mockUserModel } from "@/domain/mocks";
import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";

export class AdduserSpy implements AddUser {
    result = mockUserModel();
    params: AddUserParams;

    async add(params: AddUserParams): Promise<User> {
        this.params = params;
        return this.result;
    }
}
