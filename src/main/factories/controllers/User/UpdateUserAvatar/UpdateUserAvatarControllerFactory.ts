import { DbUpdateUserAvatar } from "@/data/usecases";
import { UUIDAdapter } from "@/infra/cryptography";
import { UserMongoRepository } from "@/infra/database/mongodb";
import { DiskStorage } from "@/infra/storage";
import { env } from "@/main/config/env";
import { makeLogControllerDecorator } from "@/main/factories";
import { UpdateUserAvatarController } from "@/presentation/controllers";
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
