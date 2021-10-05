import { LoadUserByTokenRepository } from "@/data/protocols/database/User";
import { User } from "@/domain/models/User";
import { LoadUserByToken } from "@/domain/usecases/LoadUserByToken";

export class DbLoadUserByToken implements LoadUserByToken {
    constructor(
        private readonly loadUserByTokenRepository: LoadUserByTokenRepository,
    ) {}
    async load(accessToken: string): Promise<User | null> {
        await this.loadUserByTokenRepository.loadByToken(accessToken);
        return null;
    }
}
