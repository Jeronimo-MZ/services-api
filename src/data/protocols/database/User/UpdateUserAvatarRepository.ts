export interface UpdateUserAvatarRepository {
    updateAvatar(input: UpdateUserAvatarRepository.Input): Promise<void>;
}

export namespace UpdateUserAvatarRepository {
    export type Input = {
        userId: string;
        avatar: string;
    };
}
