import faker from "faker";

import { AddUserParams } from "@/domain/usecases/AddUser";

export const mockAddUserParams = (): AddUserParams => ({
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});
