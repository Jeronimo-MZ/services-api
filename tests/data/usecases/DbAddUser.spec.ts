import { DbAddUser } from "@/data/usecases/DbAddUser";
import {
    AddUserRepositorySpy,
    HasherSpy,
    LoadUserByEmailRepositorySpy,
} from "@/tests/data/mocks";
import {
    mockAddUserParams,
    mockUserModel,
    throwError,
} from "@/tests/domain/mocks";

type SutTypes = {
    sut: DbAddUser;
    hasherSpy: HasherSpy;
    loadUserByEmailRepositorySpy: LoadUserByEmailRepositorySpy;
    addUserRepositorySpy: AddUserRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByEmailRepositorySpy = new LoadUserByEmailRepositorySpy();
    loadUserByEmailRepositorySpy.result = null;

    const hasherSpy = new HasherSpy();
    const addUserRepositorySpy = new AddUserRepositorySpy();
    const sut = new DbAddUser(
        hasherSpy,
        loadUserByEmailRepositorySpy,
        addUserRepositorySpy,
    );
    return {
        sut,
        hasherSpy,
        loadUserByEmailRepositorySpy,
        addUserRepositorySpy,
    };
};

describe("DbAddUser", () => {
    it("should call Hasher with correct password", async () => {
        const { sut, hasherSpy } = makeSut();
        const addUserParams = mockAddUserParams();
        await sut.add(addUserParams);
        expect(hasherSpy.plaintext).toEqual(addUserParams.password);
    });

    it("should throw if Hasher throws", async () => {
        const { hasherSpy, sut } = makeSut();
        jest.spyOn(hasherSpy, "hash").mockImplementationOnce(throwError);
        const promise = sut.add(mockAddUserParams());
        await expect(promise).rejects.toThrow();
    });

    it("should call LoadUserByEmailRepository with correct email", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        const addUserParams = mockAddUserParams();
        await sut.add(addUserParams);
        expect(loadUserByEmailRepositorySpy.email).toEqual(addUserParams.email);
    });

    it("should throw if LoadUserByEmailRepository throws", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        jest.spyOn(
            loadUserByEmailRepositorySpy,
            "loadByEmail",
        ).mockImplementationOnce(throwError);
        const promise = sut.add(mockAddUserParams());
        await expect(promise).rejects.toThrow();
    });

    it("should return null if LoadUserByEmailRepository returns a User", async () => {
        const { sut, loadUserByEmailRepositorySpy } = makeSut();
        loadUserByEmailRepositorySpy.result = mockUserModel();
        const user = await sut.add(mockAddUserParams());
        expect(user).toBeNull();
    });

    it("should call AddUserRepository with correct values", async () => {
        const { addUserRepositorySpy, sut, hasherSpy } = makeSut();
        hasherSpy.digest = "hashed_password";
        const addUserParams = mockAddUserParams();
        await sut.add(addUserParams);
        expect(addUserRepositorySpy.params).toEqual({
            ...addUserParams,
            password: "hashed_password",
        });
    });

    it("should throw if AddUserRepository throws", async () => {
        const { sut, addUserRepositorySpy } = makeSut();

        jest.spyOn(addUserRepositorySpy, "add").mockImplementationOnce(
            throwError,
        );
        const addUserParams = mockAddUserParams();
        const promise = sut.add(addUserParams);
        await expect(promise).rejects.toThrow();
    });

    it("should return an User on success", async () => {
        const { sut, addUserRepositorySpy } = makeSut();
        const user = await sut.add(mockAddUserParams());
        expect(user).toBeTruthy();
        expect(user).toBe(addUserRepositorySpy.result);
    });
});
