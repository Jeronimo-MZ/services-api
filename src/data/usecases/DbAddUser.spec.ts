import { mockAddUserParams, mockUserModel } from "@/domain/mocks/mockUser";
import { throwError } from "@/domain/mocks/testHelpers";

import { mockAddUserRepository, mockLoadUserByEmailRepository } from "../mocks";
import { mockHasher } from "../mocks/mockCryptography";
import { Hasher } from "../protocols/cryptography/Hasher";
import { AddUserRepository } from "../protocols/database/User/AddUserRepository";
import { LoadUserByEmailRepository } from "../protocols/database/User/LoadUserByEmailRepository";
import { DbAddUser } from "./DbAddUser";

type SutTypes = {
    sut: DbAddUser;
    hasherStub: Hasher;
    loadUserByEmailRepositoryStub: LoadUserByEmailRepository;
    addUserRepositoryStub: AddUserRepository;
};

const makeSut = (): SutTypes => {
    const loadUserByEmailRepositoryStub = mockLoadUserByEmailRepository();
    jest.spyOn(loadUserByEmailRepositoryStub, "loadByEmail").mockReturnValue(
        Promise.resolve(null),
    );

    const hasherStub = mockHasher();
    const addUserRepositoryStub = mockAddUserRepository();
    const sut = new DbAddUser(
        hasherStub,
        loadUserByEmailRepositoryStub,
        addUserRepositoryStub,
    );
    return {
        sut,
        hasherStub,
        loadUserByEmailRepositoryStub,
        addUserRepositoryStub,
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
        const { sut, loadUserByEmailRepositoryStub } = makeSut();
        jest.spyOn(
            loadUserByEmailRepositoryStub,
            "loadByEmail",
        ).mockReturnValueOnce(Promise.resolve(mockUserModel()));
        const user = await sut.add(mockAddUserParams());
        expect(user).toBeNull();
    });

    it("should call AddUserRepository with correct values", async () => {
        const { addUserRepositoryStub, sut, hasherStub } = makeSut();

        const addSpy = jest.spyOn(addUserRepositoryStub, "add");
        jest.spyOn(hasherStub, "hash").mockReturnValueOnce(
            Promise.resolve("hashed_password"),
        );

        const addUserParams = mockAddUserParams();

        await sut.add(addUserParams);
        expect(addSpy).toBeCalledWith({
            ...addUserParams,
            password: "hashed_password",
        });
    });

    it("should throw if AddUserRepository throws", async () => {
        const { sut, addUserRepositoryStub } = makeSut();

        jest.spyOn(addUserRepositoryStub, "add").mockImplementationOnce(
            throwError,
        );
        const addUserParams = mockAddUserParams();

        const promise = sut.add(addUserParams);
        await expect(promise).rejects.toThrow();
    });

    it("should return an User on success", async () => {
        const { sut, addUserRepositoryStub } = makeSut();
        const userModel = mockUserModel();
        jest.spyOn(addUserRepositoryStub, "add").mockReturnValueOnce(
            Promise.resolve(userModel),
        );
        const user = await sut.add(mockAddUserParams());
        expect(user).toBeTruthy();
        expect(user).toBe(userModel);
    });
});
