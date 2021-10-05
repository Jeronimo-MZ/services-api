import { User } from "@/domain/models/User";

export interface LoadUserByTokenRepository {
    loadByToken(token: string): Promise<User | null>;
}
