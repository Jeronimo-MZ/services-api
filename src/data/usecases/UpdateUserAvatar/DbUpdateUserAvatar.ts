import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { LoadUserByIdRepository } from "@/data/protocols/database/User";
import { UpdateUserAvatar } from "@/domain/usecases/UpdateUserAvatar";

export class DbUpdateUserAvatar implements UpdateUserAvatar {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
    ) {}
    async update({
        userId,
    }: UpdateUserAvatar.Params): Promise<UpdateUserAvatar.Result> {
        const user = await this.loadUserByIdRepository.loadById(userId);
        if (!user) {
            throw new UnexpectedError();
        }
        return null as any;
    }
}
