import faker from "faker";

import { LoadUserByEmailRepositorySpy } from "@/data/mocks";

import { DbAuthentication } from "./DbAuthentication";

describe("DbAuthentication", () => {
    it("should call LoadUserByEmailRepository with correct email", async () => {
        const email = faker.internet.email();
        const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
        const sut = new DbAuthentication(loadUserByEmailRepositorySpy);

        await sut.auth({
            email,
            password: faker.internet.password(),
        });

        expect(loadUserByEmailRepositorySpy.email).toBe(email);
    });
});
