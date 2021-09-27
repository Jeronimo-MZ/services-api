export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar?: string;
    occupation?: string;
    isAdmin: boolean;
    createdAt: Date;
    updatedAt: Date;
}
