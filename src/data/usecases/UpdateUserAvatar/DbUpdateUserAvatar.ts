import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { UUIDGenerator } from "@/data/protocols/cryptography/UUIDGenerator";
import {
    LoadUserByIdRepository,
    UpdateUserAvatarRepository,
} from "@/data/protocols/database/User/";
import { DeleteFile, SaveFile } from "@/data/protocols/storage";
import { UpdateUserAvatar } from "@/domain/usecases/UpdateUserAvatar";

export class DbUpdateUserAvatar implements UpdateUserAvatar {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly saveFile: SaveFile,
        private readonly updateUserAvatarRepository: UpdateUserAvatarRepository,
        private readonly deleteFile: DeleteFile,
    ) {}
    async update({
        userId,
        file,
    }: UpdateUserAvatar.Params): Promise<UpdateUserAvatar.Result> {
        const user = await this.loadUserByIdRepository.loadById(userId);
        if (!user) {
            throw new UnexpectedError();
        }

        const oldAvatar = user.avatar;
        const key = this.uuidGenerator.generate();
        const avatar = await this.saveFile.save({
            file: file.buffer,
            fileName: `${key}.${file.mimeType.split("/")[1]}`,
        });

        await this.updateUserAvatarRepository.updateAvatar({
            userId,
            avatar,
        });

        if (oldAvatar) await this.deleteFile.delete({ fileName: oldAvatar });

        return { avatarUrl: avatar };
    }
}
