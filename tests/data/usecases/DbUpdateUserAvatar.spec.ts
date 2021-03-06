import faker from "faker";

import { UnexpectedError } from "@/data/errors";
import { DbUpdateUserAvatar } from "@/data/usecases/DbUpdateUserAvatar";
import {
    DeleteFileSpy,
    LoadUserByIdRepositorySpy,
    SaveFileSpy,
    UpdateUserAvatarRepositorySpy,
    UUIDGeneratorSpy,
} from "@/tests/data/mocks";
import { mockUpdateUserAvatarParams, throwError } from "@/tests/domain/mocks";

type SutTypes = {
    sut: DbUpdateUserAvatar;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    uuidGeneratorSpy: UUIDGeneratorSpy;
    saveFileSpy: SaveFileSpy;
    deleteFileSpy: DeleteFileSpy;
    updateUserAvatarSpy: UpdateUserAvatarRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const uuidGeneratorSpy = new UUIDGeneratorSpy();
    const saveFileSpy = new SaveFileSpy();
    const updateUserAvatarSpy = new UpdateUserAvatarRepositorySpy();
    const deleteFileSpy = new DeleteFileSpy();
    const sut = new DbUpdateUserAvatar(
        loadUserByIdRepositorySpy,
        uuidGeneratorSpy,
        saveFileSpy,
        updateUserAvatarSpy,
        deleteFileSpy,
    );
    return {
        sut,
        loadUserByIdRepositorySpy,
        uuidGeneratorSpy,
        saveFileSpy,
        updateUserAvatarSpy,
        deleteFileSpy,
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

    it("should call DeleteFile after update if user already had an avatar", async () => {
        const {
            sut,
            deleteFileSpy,
            loadUserByIdRepositorySpy,
            updateUserAvatarSpy,
        } = makeSut();
        const updateAvatarSpy = jest.spyOn(updateUserAvatarSpy, "updateAvatar");
        if (loadUserByIdRepositorySpy.result)
            loadUserByIdRepositorySpy.result.avatar = faker.internet.url();
        const params = mockUpdateUserAvatarParams();
        await sut.update(params);
        expect(updateAvatarSpy).toHaveBeenCalled();
        expect(deleteFileSpy.fileName).toBe(
            loadUserByIdRepositorySpy.result?.avatar,
        );
    });

    it("should not call DeleteFile if user's avatar was null", async () => {
        const { sut, deleteFileSpy } = makeSut();
        await sut.update(mockUpdateUserAvatarParams());
        expect(deleteFileSpy.fileName).toBeUndefined();
    });

    it("should return correct avatar on success", async () => {
        const { sut, saveFileSpy } = makeSut();
        const result = await sut.update(mockUpdateUserAvatarParams());
        expect(result.avatarUrl).toBe(saveFileSpy.output);
    });
});
