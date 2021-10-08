import faker from "faker";

import { User } from "@/domain/models/User";
import { AddUserParams } from "@/domain/usecases/AddUser";
import { AuthenticationParams } from "@/domain/usecases/Authentication";

export const mockAddUserParams = (): AddUserParams => ({
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
});

export const mockUserModel = (): User => ({
    id: faker.datatype.uuid(),
    name: faker.name.firstName() + " " + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    isAdmin: false,
    avatar: null,
    occupation: null,
    accessToken: null,
});

export const mockAuthenticationParams = (): AuthenticationParams => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
});
