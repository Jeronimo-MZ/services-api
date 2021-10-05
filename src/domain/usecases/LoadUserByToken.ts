import { User } from "@/domain/models/User";

export interface LoadUserByToken {
    load(accessToken: string): Promise<User | null>;
}
