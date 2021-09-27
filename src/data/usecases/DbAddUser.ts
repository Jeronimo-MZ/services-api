import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";

import { Hasher } from "../protocols/cryptography/Hasher";

export class DbAddUser implements AddUser {
    constructor(private readonly hasher: Hasher) {}
    async add({ password }: AddUserParams): Promise<User | null> {
        await this.hasher.hash(password);
        return null;
    }
}
