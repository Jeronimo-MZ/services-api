import faker from "faker";

import { AddUserParams } from "@/domain/usecases/AddUser";

import { User } from "../models/User";

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
    avatar: undefined,
    occupation: undefined,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
});
