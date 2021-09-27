import { mockAddUserParams } from "@/domain/test/mockUser";

import { Hasher } from "../protocols/cryptography/Hasher";
import { mockHasher } from "../test/mockCryptography";
import { DbAddUser } from "./DbAddUser";

type SutTypes = {
    sut: DbAddUser;
    hasherStub: Hasher;
};

const makeSut = (): SutTypes => {
    const hasherStub = mockHasher();
    const sut = new DbAddUser(hasherStub);
    return {
        sut,
        hasherStub,
    };
};

describe("DbAddUser", () => {
    it("should Hasher with correct password", async () => {
        const { sut, hasherStub } = makeSut();
        const hashSpy = jest.spyOn(hasherStub, "hash");
        const addUserParams = mockAddUserParams();
        await sut.add(addUserParams);
        expect(hashSpy).toHaveBeenCalledWith(addUserParams.password);
    });
});
