import { UnexpectedError } from "@/data/errors/UnexpectedError";
import { LoadUserByIdRepositorySpy } from "@/data/mocks";
import { mockUpdateUserAvatarParams, throwError } from "@/domain/mocks";

import { DbUpdateUserAvatar } from "./DbUpdateUserAvatar";

type SutTypes = {
    sut: DbUpdateUserAvatar;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const sut = new DbUpdateUserAvatar(loadUserByIdRepositorySpy);
    return {
        sut,
        loadUserByIdRepositorySpy,
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
});
