import bcrypt from "bcrypt";
import faker from "faker";

import { BcryptAdapter } from "./BcryptAdapter";

const salt = 12;
const hash = faker.random.alphaNumeric(30);

jest.mock("bcrypt", () => ({
    hash: async (): Promise<string> => {
        return hash;
    },
}));
const makeSut = (): BcryptAdapter => new BcryptAdapter(salt);

describe("BcryptAdapter", () => {
    describe("hash()", () => {
        it("should call hash with correct plaintext", async () => {
            const sut = makeSut();
            const hashSpy = jest.spyOn(bcrypt, "hash");
            const plaintext = faker.internet.password();
            await sut.hash(plaintext);
            expect(hashSpy).toHaveBeenCalledWith(plaintext, salt);
        });
    });
});
