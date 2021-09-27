import { User } from "@/domain/models/User";

export interface LoadUserByEmailRepository {
    loadByEmail(email: string): Promise<User | null>;
}
