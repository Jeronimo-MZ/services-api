import { LoadUserByIdRepository } from "@/data/protocols/database/User";
import { UpdateUserAvatar } from "@/domain/usecases/UpdateUserAvatar";

export class DbUpdateUserAvatar implements UpdateUserAvatar {
    constructor(
        private readonly loadUserByIdRepository: LoadUserByIdRepository,
    ) {}
    async update({
        userId,
    }: UpdateUserAvatar.Params): Promise<UpdateUserAvatar.Result> {
        this.loadUserByIdRepository.loadById(userId);
        return null as any;
    }
}
