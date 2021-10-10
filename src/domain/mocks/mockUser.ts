import faker from "faker";

import { User } from "@/domain/models/User";
import { AddUser } from "@/domain/usecases/AddUser";
import { Authentication } from "@/domain/usecases/Authentication";

export const mockAddUserParams = (): AddUser.Params => ({
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

export const mockAuthenticationParams = (): Authentication.Params => ({
    email: faker.internet.email(),
    password: faker.internet.password(),
});
