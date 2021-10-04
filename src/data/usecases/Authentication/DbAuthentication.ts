import { HashComparer } from "@/data/protocols/cryptography";
import { LoadUserByEmailRepository } from "@/data/protocols/database/User";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/usecases/Authentication";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly hashComparer: HashComparer,
    ) {}

    async auth({
        email,
        password,
    }: AuthenticationParams): Promise<string | null> {
        const user = await this.loadUserByEmailRepository.loadByEmail(email);
        if (!user) return null;
        await this.hashComparer.compare(password, user?.password);
        return null;
    }
}
