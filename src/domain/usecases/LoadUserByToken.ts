import { User } from "@/domain/models";

export interface LoadUserByToken {
    load(accessToken: string): Promise<User | null>;
}
