export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string | null;
    occupation: string | null;
    isAdmin: boolean;
    accessToken: string | null;
}
