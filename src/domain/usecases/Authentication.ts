export type AuthenticationParams = {
    email: string;
    password: string;
};

export interface Authentication {
    auth(data: AuthenticationParams): Promise<string | null>;
}
