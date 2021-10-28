export interface UpdateUserAvatar {
    update(params: UpdateUserAvatar.Params): Promise<UpdateUserAvatar.Result>;
}

export namespace UpdateUserAvatar {
    export type Params = {
        userId: string;
        tempFilePath: string;
    };

    export type Result = {
        avatarUrl: string;
    };
}
