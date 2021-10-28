import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { UUIDGenerator } from "@/data/protocols/cryptography/UUIDGenerator";
import {
    LoadUserByIdRepository,
    UpdateUserAvatarRepository,
} from "@/data/protocols/database/User/";
import { SaveFile } from "@/data/protocols/Storage";
import { UpdateUserAvatar } from "@/domain/usecases/UpdateUserAvatar";

export class DbUpdateUserAvatar implements UpdateUserAvatar {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly uuidGenerator: UUIDGenerator,
        private readonly saveFile: SaveFile,
        private readonly updateUserAvatarRepository: UpdateUserAvatarRepository,
    ) {}
    async update({
        userId,
        file,
    }: UpdateUserAvatar.Params): Promise<UpdateUserAvatar.Result> {
        const user = await this.loadUserByIdRepository.loadById(userId);
        if (!user) {
            throw new UnexpectedError();
        }

        const key = this.uuidGenerator.generate();
        const avatarUrl = await this.saveFile.save({
            file: file.buffer,
            fileName: `${key}.${file.mimeType.split("/")[1]}`,
        });

        await this.updateUserAvatarRepository.updateAvatar({
            userId,
            avatar: avatarUrl,
        });

        return null as any;
    }
}
