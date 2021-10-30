import { User } from "@/domain/models";
import { AddUser } from "@/domain/usecases";

export interface AddUserRepository {
    add(userData: AddUser.Params): Promise<User>;
}
