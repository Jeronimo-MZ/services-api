import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { LoadUserByIdRepositorySpy, UUIDGeneratorSpy } from "@/data/mocks";
import { mockUpdateUserAvatarParams, throwError } from "@/domain/mocks";

import { DbUpdateUserAvatar } from "./DbUpdateUserAvatar";

type SutTypes = {
    sut: DbUpdateUserAvatar;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    uuidGeneratorSpy: UUIDGeneratorSpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const uuidGeneratorSpy = new UUIDGeneratorSpy();
    const sut = new DbUpdateUserAvatar(
        loadUserByIdRepositorySpy,
        uuidGeneratorSpy,
    );
    return {
        sut,
        loadUserByIdRepositorySpy,
        uuidGeneratorSpy,
    };
};

describe("DbUpdateUserAvatar", () => {
    it("should call LoadUserByIdRespository with correct id", async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        const params = mockUpdateUserAvatarParams();
        await sut.update(params);
        expect(loadUserByIdRepositorySpy.id).toBe(params.userId);
    });

    it("should throw UnexpectedError if LoadUserByIdRepository returns null", async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        loadUserByIdRepositorySpy.result = null;
        const promise = sut.update(mockUpdateUserAvatarParams());
        await expect(promise).rejects.toThrow(UnexpectedError);
    });

    it("should throw if LoadUserByIdRepository throws", async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        jest.spyOn(
            loadUserByIdRepositorySpy,
            "loadById",
        ).mockImplementationOnce(throwError);
        const promise = sut.update(mockUpdateUserAvatarParams());
        await expect(promise).rejects.toThrow();
    });

    it("should call UUIDGenerator", async () => {
        const { sut, uuidGeneratorSpy } = makeSut();
        const generateSpy = jest.spyOn(uuidGeneratorSpy, "generate");
        await sut.update(mockUpdateUserAvatarParams());
        expect(generateSpy).toHaveBeenCalled();
    });

    it("should throw if UUIDGenerator throws", async () => {
        const { sut, uuidGeneratorSpy } = makeSut();
        jest.spyOn(uuidGeneratorSpy, "generate").mockImplementationOnce(
            throwError,
        );
        const promise = sut.update(mockUpdateUserAvatarParams());
        await expect(promise).rejects.toThrow();
    });
});
