import { mockAddUserParams } from "@/domain/test/mockUser";
import { throwError } from "@/domain/test/testHelpers";

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
});
