import { User } from "@/domain/models";

export interface LoadUserByTokenRepository {
    loadByToken(token: string): Promise<User | null>;
}
