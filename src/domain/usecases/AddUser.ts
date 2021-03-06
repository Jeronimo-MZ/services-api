import { User } from "@/domain/models";

export interface AddUser {
    add(data: AddUser.Params): Promise<User | null>;
}
export namespace AddUser {
    export type Params = {
        name: string;
        email: string;
        password: string;
    };
}
