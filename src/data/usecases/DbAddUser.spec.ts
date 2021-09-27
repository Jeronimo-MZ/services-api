import { mockAddUserParams } from "@/domain/test/mockUser";
import { throwError } from "@/domain/test/testHelpers";

import { Hasher } from "../protocols/cryptography/Hasher";
import { LoadUserByEmailRepository } from "../protocols/database/User/LoadUserByEmailRepository";
import { mockLoadUserByEmailRepository } from "../test";
import { mockHasher } from "../test/mockCryptography";
import { DbAddUser } from "./DbAddUser";

type SutTypes = {
    sut: DbAddUser;
    hasherStub: Hasher;
    loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
};

const makeSut = (): SutTypes => {
    const hasherStub = mockHasher();
    const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
    const sut = new DbAddUser(hasherStub, loadUserByEmailRepositoryStub);
    return {
        sut,
        hasherStub,
        loadUserByEmailRepositoryStub,
    };
};

describe("DbAddUser", () => {
    it("should call Hasher with correct password", async () => {
        const { sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, "hash");
        const addUserParams = mockAddUserParams();
        await sut.add(addUserParams);
        expect(hashSpy).toHaveBeenCalledWith(addUserParams.password);
    });

    it("should throw if Hasher throws", async () => {
        const { hasherStub, sut } = makeSut();

        jest.spyOn(hasherStub, "hash").mockImplementationOnce(throwError);
        const addUserParams = mockAddUserParams();

        const promise = sut.add(addUserParams);
        await expect(promise).rejects.toThrow();
    });

    it("should call LoadUserByEmailRepository with correct email", async () => {
        const { sut, loadUserByEmailRepositoryStub } = makeSut();
        const loadByEmailSpy = jest.spyOn(
            loadUserByEmailRepositoryStub,
            "loadByEmail",
        );

        const addUserParams = mockAddUserParams();
        await sut.add(addUserParams);
        expect(loadByEmailSpy).toHaveBeenCalledWith(addUserParams.email);
    });

    it("should throw if LoadUserByEmailRepository throws", async () => {
        const { sut, loadUserByEmailRepositoryStub } = makeSut();

        jest.spyOn(
            loadUserByEmailRepositoryStub,
            "loadByEmail",
        ).mockImplementationOnce(throwError);
        const addUserParams = mockAddUserParams();

        const promise = sut.add(addUserParams);
        await expect(promise).rejects.toThrow();
    });

    it("should return null if LoadUserByEmailRepository returns a User", async () => {
        const { sut } = makeSut();
        const user = await sut.add(mockAddUserParams());
        expect(user).toBeNull();
    });
});
