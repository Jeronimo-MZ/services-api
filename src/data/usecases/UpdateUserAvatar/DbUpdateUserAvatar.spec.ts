import { UnexpectedError } from "@/data/errors/UnexpectedError";
import {
    LoadUserByIdRepositorySpy,
    SaveFileSpy,
    UpdateUserAvatarRepositorySpy,
    UUIDGeneratorSpy,
} from "@/data/mocks";
import { mockUpdateUserAvatarParams, throwError } from "@/domain/mocks";

import { DbUpdateUserAvatar } from "./DbUpdateUserAvatar";

type SutTypes = {
    sut: DbUpdateUserAvatar;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    uuidGeneratorSpy: UUIDGeneratorSpy;
    saveFileSpy: SaveFileSpy;
    updateUserAvatarSpy: UpdateUserAvatarRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const uuidGeneratorSpy = new UUIDGeneratorSpy();
    const saveFileSpy = new SaveFileSpy();
    const updateUserAvatarSpy = new UpdateUserAvatarRepositorySpy();
    const sut = new DbUpdateUserAvatar(
        loadUserByIdRepositorySpy,
        uuidGeneratorSpy,
        saveFileSpy,
        updateUserAvatarSpy,
    );
    return {
        sut,
        loadUserByIdRepositorySpy,
        uuidGeneratorSpy,
        saveFileSpy,
        updateUserAvatarSpy,
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

    it("should call SaveFile with correct values", async () => {
        const { saveFileSpy, sut, uuidGeneratorSpy } = makeSut();
        const params = mockUpdateUserAvatarParams();
        await sut.update(params);
        expect(saveFileSpy.file).toBe(params.file.buffer);
        expect(saveFileSpy.fileName).toBe(`${uuidGeneratorSpy.uuid}.jpeg`);
    });

    it("should throw if SaveFile throws", async () => {
        const { sut, saveFileSpy } = makeSut();
        jest.spyOn(saveFileSpy, "save").mockImplementationOnce(throwError);
        const promise = sut.update(mockUpdateUserAvatarParams());
        await expect(promise).rejects.toThrow();
    });

    it("should call UpdateUserAvatarRepository with correct values", async () => {
        const { sut, updateUserAvatarSpy, saveFileSpy } = makeSut();
        const params = mockUpdateUserAvatarParams();
        await sut.update(params);
        expect(updateUserAvatarSpy.userId).toBe(params.userId);
        expect(updateUserAvatarSpy.avatar).toBe(saveFileSpy.output);
    });

    it("should throw if UpdateUserAvatarRepository throws", async () => {
        const { sut, updateUserAvatarSpy } = makeSut();
        jest.spyOn(updateUserAvatarSpy, "updateAvatar").mockImplementationOnce(
            throwError,
        );
        const promise = sut.update(mockUpdateUserAvatarParams());
        await expect(promise).rejects.toThrow();
    });
});
