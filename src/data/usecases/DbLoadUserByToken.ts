import { Decrypter } from "@/data/protocols/cryptography";
import { LoadUserByTokenRepository } from "@/data/protocols/database";
import { User } from "@/domain/models";
import { LoadUserByToken } from "@/domain/usecases";

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
