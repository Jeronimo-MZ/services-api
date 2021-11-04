import { DbAuthentication } from "@/data/usecases/DbAuthentication";
import { mockAuthenticationParams, throwError } from "@/domain/mocks";
import {
    EncrypterSpy,
    HashComparerSpy,
    LoadUserByEmailRepositorySpy,
    UpdateAccessTokenRepositorySpy,
} from "@/tests/data/mocks";

type SutTypes = {
    sut: DbAuthentication;
    encrypterSpy: EncrypterSpy;
    hashComparerSpy: HashComparerSpy;
    loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
    updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    const encrypterSpy = new EncrypterSpy();
    const hashComparerSpy = new HashComparerSpy();
    const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy();
    const sut = new DbAuthentication(
        loadUserByEmailRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
        updateAccessTokenRepositorySpy,
    );

    return {
        sut,
        loadUserByEmailRepositorySpy,
        hashComparerSpy,
        encrypterSpy,
        updateAccessTokenRepositorySpy,
    };
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

    it("should throw if Encrypter throws", async () => {
        const { sut, encrypterSpy } = makeSut();
        jest.spyOn(encrypterSpy, "encrypt").mockImplementation(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    it("should call UpdateAccessTokenRepository with correct values", async () => {
        const {
            sut,
            updateAccessTokenRepositorySpy,
            loadUserByEmailRepositorySpy,
            encrypterSpy,
        } = makeSut();
        await sut.auth(mockAuthenticationParams());
        expect(updateAccessTokenRepositorySpy.id).toBe(
            loadUserByEmailRepositorySpy.result?.id,
        );
        expect(updateAccessTokenRepositorySpy.token).toBe(
            encrypterSpy.ciphertext,
        );
    });

    it("should throw if UpdateAccessTokenRepository throws", async () => {
        const { sut, updateAccessTokenRepositorySpy } = makeSut();
        jest.spyOn(
            updateAccessTokenRepositorySpy,
            "updateAccessToken",
        ).mockImplementation(throwError);
        const promise = sut.auth(mockAuthenticationParams());
        await expect(promise).rejects.toThrow();
    });

    it("should return an access token on success", async () => {
        const { sut, encrypterSpy } = makeSut();
        const token = await sut.auth(mockAuthenticationParams());
        expect(token).toBe(encrypterSpy.ciphertext);
    });
});
