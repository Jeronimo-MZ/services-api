import faker from "faker";

import { DecrypterSpy, LoadUserByTokenRepositorySpy } from "@/data/mocks";
import { throwError } from "@/domain/mocks";

import { DbLoadUserByToken } from "./DbLoadUserByToken";

type SutTypes = {
    sut: DbLoadUserByToken;
    loadUserByTokenSpy: LoadUserByTokenRepositorySpy;
    decrypterSpy: DecrypterSpy;
};

const token = faker.datatype.uuid();

const makeSut = (): SutTypes => {
    const loadUserByTokenSpy = new LoadUserByTokenRepositorySpy();
    const decrypterSpy = new DecrypterSpy();
    const sut = new DbLoadUserByToken(loadUserByTokenSpy, decrypterSpy);

    return {
        sut,
        loadUserByTokenSpy,
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
        const account = await sut.load(token);
        expect(account).toBeNull();
    });

    it("should throw if Decrypter throws", async () => {
        const { sut, decrypterSpy } = makeSut();
        jest.spyOn(decrypterSpy, "decrypt").mockImplementationOnce(throwError);
        const promise = sut.load(token);
        await expect(promise).rejects.toThrow();
    });

    it("should call LoadUserByTokenRepository with correct token", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        await sut.load(token);
        expect(loadUserByTokenSpy.token).toBe(token);
    });
});
