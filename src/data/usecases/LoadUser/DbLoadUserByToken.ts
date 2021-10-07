import { Decrypter } from "@/data/protocols/cryptography/Decrypter";
import { LoadUserByTokenRepository } from "@/data/protocols/database/User";
import { User } from "@/domain/models/User";
import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";

export class DbLoadUserByToken implements LoadUserByToken {
    constructor(
        private readonly loadUserByTokenRepository: LoadUserByTokenRepository,
        private readonly decrypter: Decrypter,
    ) {}
    async load(accessToken: string): Promise<User | null> {
        const isValid = !!(await this.decrypter.decrypt(accessToken));
        if (isValid) {
            return await this.loadUserByTokenRepository.loadByToken(
                accessToken,
            );
        }
        return null;
    }
}
