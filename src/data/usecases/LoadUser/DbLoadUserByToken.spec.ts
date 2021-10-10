import faker from "faker";

import { DecrypterSpy, LoadUserByTokenRepositorySpy } from "@/data/mocks";
import { throwError } from "@/domain/mocks";

import { DbLoadUserByToken } from "./DbLoadUserByToken";

type SutTypes = {
    sut: DbLoadUserByToken;
    loadUserByTokenRepositorySpy: LoadUserByTokenRepositorySpy;
    decrypterSpy: DecrypterSpy;
};

const token = faker.datatype.uuid();

const makeSut = (): SutTypes => {
    const loadUserByTokenRepositorySpy = new LoadUserByTokenRepositorySpy();
    const decrypterSpy = new DecrypterSpy();
    const sut = new DbLoadUserByToken(
        loadUserByTokenRepositorySpy,
        decrypterSpy,
    );

    return {
        sut,
        loadUserByTokenRepositorySpy,
        decrypterSpy,
    };
};
describe("DbLoadUserByToken", () => {
    it("should call Decrypter with correct value", async () => {
        const { sut, decrypterSpy } = makeSut();
        await sut.load(token);
        expect(decrypterSpy.ciphertext).toBe(token);
    });

    it("should return null if Decrypter returns null", async () => {
        const { sut, decrypterSpy } = makeSut();
        decrypterSpy.plaintext = null;
        const user = await sut.load(token);
        expect(user).toBeNull();
    });

    it("should throw if Decrypter throws", async () => {
        const { sut, decrypterSpy } = makeSut();
        jest.spyOn(decrypterSpy, "decrypt").mockImplementationOnce(throwError);
        const promise = sut.load(token);
        await expect(promise).rejects.toThrow();
    });

    it("should call LoadUserByTokenRepository with correct token", async () => {
        const { sut, loadUserByTokenRepositorySpy } = makeSut();
        await sut.load(token);
        expect(loadUserByTokenRepositorySpy.token).toBe(token);
    });

    it("should throw if LoadUserByTokenRepository throws", async () => {
        const { sut, loadUserByTokenRepositorySpy } = makeSut();
        jest.spyOn(
            loadUserByTokenRepositorySpy,
            "loadByToken",
        ).mockImplementationOnce(throwError);
        const promise = sut.load(token);
        await expect(promise).rejects.toThrow();
    });

    it("should return a user on success", async () => {
        const { sut, loadUserByTokenRepositorySpy } = makeSut();
        const user = await sut.load(token);
        expect(user).toEqual(loadUserByTokenRepositorySpy.result);
    });
});
