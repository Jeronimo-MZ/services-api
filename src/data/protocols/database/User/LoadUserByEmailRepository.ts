import { User } from "@/domain/models";

export interface LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<User | null>;
}
