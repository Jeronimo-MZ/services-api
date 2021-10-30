import { Hasher } from "@/data/protocols/cryptography";
import {
    AddUserRepository,
    LoadUserByEmailRepository,
} from "@/data/protocols/database";
import { User } from "@/domain/models";
import { AddUser } from "@/domain/usecases";

export class DbAddUser implements AddUser {
    constructor(
        private readonly hasher: Hasher,
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly addUserRepository: AddUserRepository,
    ) {}
    async add({ name, password, email }: AddUser.Params): Promise<User | null> {
        const user = await this.loadUserByEmailRepository.loadByEmail(email);
        if (user) {
            return null;
        }
        const hashedPassword = await this.hasher.hash(password);
        return await this.addUserRepository.add({
            email,
            name,
            password: hashedPassword,
        });
    }
}
