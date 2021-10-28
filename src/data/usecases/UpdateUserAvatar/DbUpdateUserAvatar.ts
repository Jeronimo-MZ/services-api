import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { UUIDGenerator } from "@/data/protocols/cryptography/UUIDGenerator";
import { LoadUserByIdRepository } from "@/data/protocols/database/User";
import { UpdateUserAvatar } from "@/domain/usecases/UpdateUserAvatar";

export class DbUpdateUserAvatar implements UpdateUserAvatar {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
        private readonly uuidGenerator: UUIDGenerator,
    ) {}
    async update({
        userId,
    }: UpdateUserAvatar.Params): Promise<UpdateUserAvatar.Result> {
        const user = await this.loadUserByIdRepository.loadById(userId);
        if (!user) {
            throw new UnexpectedError();
        }

        this.uuidGenerator.generate();
        return null as any;
    }
}
