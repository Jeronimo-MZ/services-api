import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";

import { Hasher } from "../protocols/cryptography/Hasher";
import { LoadUserByEmailRepository } from "../protocols/database/User/LoadUserByEmailRepository";

export class DbAddUser implements AddUser {
    constructor(
        private readonly hasher: Hasher,
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    ) {}
    async add({ password, email }: AddUserParams): Promise<User | null> {
        await this.hasher.hash(password);
        await this.loadUserByEmailRepository.loadByEmail(email);
        return null;
    }
}
