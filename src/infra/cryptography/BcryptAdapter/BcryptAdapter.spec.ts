import bcrypt from "bcrypt";
import faker from "faker";

import { throwError } from "@/domain/mocks";

import { BcryptAdapter } from "./BcryptAdapter";

const salt = 12;
const generatedHash = faker.random.alphaNumeric(30);
const plaintext = faker.internet.password();
const digest = faker.datatype.uuid();

jest.mock("bcrypt", () => ({
    hash: async (): Promise<string> => {
        return generatedHash;
    },
    async compare(): Promise<boolean> {
        return true;
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

        it("should throw if hash throws", async () => {
            const sut = makeSut();
            jest.spyOn(bcrypt, "hash").mockImplementationOnce(throwError);
            const promise = sut.hash(faker.internet.password());
            await expect(promise).rejects.toThrow();
        });
    });

    describe("compare()", () => {
        it("should call compare with correct values", async () => {
            const sut = makeSut();
            const compareSpy = jest.spyOn(bcrypt, "compare");
            await sut.compare(plaintext, digest);
            expect(compareSpy).toHaveBeenCalledWith(plaintext, digest);
        });

        it("should return false if compare fails", async () => {
            const sut = makeSut();
            jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => false);
            const isValid = await sut.compare(plaintext, digest);
            expect(isValid).toBe(false);
        });

        it("should return true if compare succeeds", async () => {
            const sut = makeSut();
            const isValid = await sut.compare(plaintext, digest);
            expect(isValid).toBe(true);
        });
    });
});
