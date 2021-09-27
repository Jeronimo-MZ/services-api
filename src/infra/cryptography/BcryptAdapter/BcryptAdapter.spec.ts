import bcrypt from "bcrypt";
import faker from "faker";

import { BcryptAdapter } from "./BcryptAdapter";

const salt = 12;
const generatedHash = faker.random.alphaNumeric(30);

jest.mock("bcrypt", () => ({
    hash: async (): Promise<string> => {
        return generatedHash;
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

        it("should return a valid hash on hash success", async () => {
            const sut = makeSut();
            const hash = await sut.hash(faker.internet.password());
            expect(hash).toBe(generatedHash);
        });
    });
});
