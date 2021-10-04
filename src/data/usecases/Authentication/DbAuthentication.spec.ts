import { HashComparerSpy, LoadUserByEmailRepositorySpy } from "@/data/mocks";
import { mockAuthenticationParams, throwError } from "@/domain/mocks";

import { DbAuthentication } from "./DbAuthentication";

type SutTypes = {
    sut: DbAuthentication;
    loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
    hashComparerSpy: HashComparerSpy;
};

const makeSut = (): SutTypes => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    const hashComparerSpy = new HashComparerSpy();
    const sut = new DbAuthentication(
        loadUserByEmailRepositorySpy,
        hashComparerSpy,
    );

    return { sut, loadUserByEmailRepositorySpy, hashComparerSpy };
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

    it("should throw if LoadUserByEmailRepository throws", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        jest.spyOn(
            loadUserByEmailRepositorySpy,
            "loadByEmail",
        ).mockImplementation(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    it("should call HashComparer with correct values", async () => {
        const { sut, hashComparerSpy, loadUserByEmailRepositorySpy } =
            makeSut();
        const authenticationParams = mockAuthenticationParams();
        await sut.auth(authenticationParams);
        expect(hashComparerSpy.plaintext).toBe(authenticationParams.password);
        expect(hashComparerSpy.digest).toBe(
            loadUserByEmailRepositorySpy.result?.password,
        );
    });
});
