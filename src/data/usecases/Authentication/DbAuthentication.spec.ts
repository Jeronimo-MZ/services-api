import {
    EncrypterSpy,
    HashComparerSpy,
    LoadUserByEmailRepositorySpy,
} from "@/data/mocks";
import { mockAuthenticationParams, throwError } from "@/domain/mocks";

import { DbAuthentication } from "./DbAuthentication";

type SutTypes = {
    sut: DbAuthentication;
    encrypterSpy: EncrypterSpy;
    hashComparerSpy: HashComparerSpy;
    loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    const encrypterSpy = new EncrypterSpy();
    const hashComparerSpy = new HashComparerSpy();
    const sut = new DbAuthentication(
        loadUserByEmailRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
    );

    return { sut, loadUserByEmailRepositorySpy, hashComparerSpy, encrypterSpy };
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

    it("should return null if HashComparer returns false", async () => {
        const { sut, hashComparerSpy } = makeSut();
        hashComparerSpy.isValid = false;
        const token = await sut.auth(mockAuthenticationParams());
        expect(token).toBeNull();
    });

    it("should throw if HashComparer throws", async () => {
        const { sut, hashComparerSpy } = makeSut();
        jest.spyOn(hashComparerSpy, "compare").mockImplementation(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    it("should call Encrypter with correct plaintext", async () => {
        const { sut, encrypterSpy, loadUserByEmailRepositorySpy } = makeSut();
        await sut.auth(mockAuthenticationParams());
        expect(encrypterSpy.plaintext).toBe(
            loadUserByEmailRepositorySpy.result?.id,
        );
    });
});
