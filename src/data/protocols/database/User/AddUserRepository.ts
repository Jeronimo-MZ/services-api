import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";

export interface AddUserRepository {
    add(userData: AddUserParams): Promise<User>;
}
