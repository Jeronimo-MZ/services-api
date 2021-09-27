import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";

import { Hasher } from "../protocols/cryptography/Hasher";
import { AddUserRepository } from "../protocols/database/User/AddUserRepository";
import { LoadUserByEmailRepository } from "../protocols/database/User/LoadUserByEmailRepository";

export class DbAddUser implements AddUser {
    constructor(
        private readonly hasher: Hasher,
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly addUserRepository: AddUserRepository,
    ) {}
    async add({ name, password, email }: AddUserParams): Promise<User | null> {
        const user = await this.loadUserByEmailRepository.loadByEmail(email);
        if (user) {
            return null;
        }
        const hashed_password = await this.hasher.hash(password);
        return await this.addUserRepository.add({
            email,
            name,
            password: hashed_password,
        });
    }
}
