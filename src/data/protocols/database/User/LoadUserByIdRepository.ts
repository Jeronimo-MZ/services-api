import { User } from "@/domain/models/User";

export interface LoadUserByIdRepository {
    loadById(id: string): Promise<User | null>;
}
