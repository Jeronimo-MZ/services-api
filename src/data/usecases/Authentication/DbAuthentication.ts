import { LoadUserByEmailRepository } from "@/data/protocols/database/User";
import {
    Authentication,
    AuthenticationParams,
} from "@/domain/usecases/Authentication";

export class DbAuthentication implements Authentication {
    constructor(
        private readonly loadUserByEmailRepository: LoadUserByEmailRepository,
    ) {}

    async auth({ email }: AuthenticationParams): Promise<string | null> {
        await this.loadUserByEmailRepository.loadByEmail(email);
        return null;
    }
}
