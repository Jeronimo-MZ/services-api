export interface Authentication {
    auth(data: Authentication.Params): Promise<string | null>;
}

export namespace Authentication {
    export type Params = {
        email: string;
        password: string;
    };
}
