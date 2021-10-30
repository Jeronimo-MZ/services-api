import { User } from "@/domain/models";

export interface LoadUserByIdRepository {
    loadById(id: string): Promise<User | null>;
}
