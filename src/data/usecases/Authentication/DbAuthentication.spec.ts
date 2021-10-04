import faker from "faker";

import { LoadUserByEmailRepositorySpy } from "@/data/mocks";

import { DbAuthentication } from "./DbAuthentication";

type SutTypes = {
    sut: DbAuthentication;
    loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    const sut = new DbAuthentication(loadUserByEmailRepositorySpy);

    return { sut, loadUserByEmailRepositorySpy };
};

describe("DbAuthentication", () => {
    it("should call LoadUserByEmailRepository with correct email", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        const email = faker.internet.email();

        await sut.auth({
            email,
            password: faker.internet.password(),
        });

        expect(loadUserByEmailRepositorySpy.email).toBe(email);
    });

    it("should return null if LoadUserByEmailRepository returns null", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        const email = faker.internet.email();
        loadUserByEmailRepositorySpy.result = null;

        const token = await sut.auth({
            email,
            password: faker.internet.password(),
        });

        expect(token).toBeNull();
    });
});
