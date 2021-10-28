import { LoadUserByIdRepositorySpy } from "@/data/mocks";
import { mockUpdateUserAvatarParams } from "@/domain/mocks";

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
});
