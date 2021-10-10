import { User } from "@/domain/models/User";
import { AddUser } from "@/domain/usecases/AddUser";

export interface AddUserRepository {
    add(userData: AddUser.Params): Promise<User>;
}
