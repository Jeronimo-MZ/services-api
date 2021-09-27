import { User } from "../models/User";

export type AddUserParams = {
    name: string;
    email: string;
    password: string;
};

export interface AddUser {
    add(data: AddUserParams): Promise<User | null>;
}
