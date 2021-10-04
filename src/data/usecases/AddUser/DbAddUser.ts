import { Hasher } from "@/data/protocols/cryptography";
import {
    AddUserRepository,
    LoadUserByEmailRepository,
} from "@/data/protocols/database/User";
import { User } from "@/domain/models/User";
import { AddUser, AddUserParams } from "@/domain/usecases/AddUser";

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
        const hashedPassword = await this.hasher.hash(password);
        return await this.addUserRepository.add({
            email,
            name,
            password: hashedPassword,
        });
    }
}
