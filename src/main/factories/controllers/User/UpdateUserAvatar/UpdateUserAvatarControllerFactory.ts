import { DbUpdateUserAvatar } from "@/data/usecases/UpdateUserAvatar/DbUpdateUserAvatar";
import { UUIDAdapter } from "@/infra/cryptography/UUIDAdapter/UUIDAdapter";
import { UserMongoRepository } from "@/infra/database/mongodb/repositories/User/User";
import { DiskStorage } from "@/infra/storage/DiskStorage/DiskStorage";
import { env } from "@/main/config/env";
import { makeLogControllerDecorator } from "@/main/factories/decorators/LogControllerFactory";
import { UpdateUserAvatarController } from "@/presentation/controllers/User/UpdateUserAvatar/UpdateUserAvatarController";
import { Controller } from "@/presentation/protocols";

import { makeUpdateUserAvatarValidation } from "./UpdateUserAvatarValidationFactory";

export const makeUpdateUserAvatarController = (): Controller => {
    const userRepository = new UserMongoRepository();
    const uuidAdapter = new UUIDAdapter();
    const diskStorage = new DiskStorage(env.staticFilesPath);
    const updateUserAvatar = new DbUpdateUserAvatar(
        userRepository,
        uuidAdapter,
        diskStorage,
        userRepository,
        diskStorage,
    );
    const controller = new UpdateUserAvatarController(
        makeUpdateUserAvatarValidation(),
        updateUserAvatar,
    );

    return makeLogControllerDecorator(controller);
};
