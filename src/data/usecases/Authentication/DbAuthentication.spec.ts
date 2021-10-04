import { LoadUserByEmailRepositorySpy } from "@/data/mocks";
import { mockAuthenticationParams } from "@/domain/mocks";

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
        const authenticationParams = mockAuthenticationParams();
        await sut.auth(authenticationParams);
        expect(loadUserByEmailRepositorySpy.email).toBe(
            authenticationParams.email,
        );
    });

    it("should return null if LoadUserByEmailRepository returns null", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        loadUserByEmailRepositorySpy.result = null;
        const token = await sut.auth(mockAuthenticationParams());
        expect(token).toBeNull();
    });
});
