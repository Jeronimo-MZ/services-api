import { Encryter, HashComparer } from "@/data/protocols/cryptography";
import {
    LoadUserByEmailRepository,
    UpdateAccessTokenRepository,
} from "@/data/protocols/database/User";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/usecases/Authentication";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
        private readonly hashComparer: HashComparer,
        private readonly encrypter: Encryter,
        private readonly updateAccessTokenRepository: UpdateAccessTokenRepository,
    ) {}

    async auth({
        email,
        password,
    }: AuthenticationParams): Promise<string | null> {
        const user = await this.loadUserByEmailRepository.loadByEmail(email);
        if (!user) return null;
        await this.hashComparer.compare(password, user?.password);
        const token = await this.encrypter.encrypt(user.id);
        await this.updateAccessTokenRepository.updateAccessToken(
            user.id,
            token,
        );
        return null;
    }
}
