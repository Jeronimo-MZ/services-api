import faker from "faker";
import jwt from "jsonwebtoken";

import { throwError } from "@/tests/domain/mocks";

import { JwtAdapter } from "./JwtAdapter";

const secret = faker.random.alphaNumeric(50);
const plaintext = faker.datatype.uuid();
const token = faker.random.alphaNumeric(50);

jest.mock("jsonwebtoken", () => ({
    sign: () => {
        return token;
    },
    verify: () => {
        return { data: plaintext };
    },
}));

const makeSut = (): JwtAdapter => {
    return new JwtAdapter(secret);
};

describe("JwtAdapter", () => {
    describe("encrypt()", () => {
        it("should calls sign with correct values", async () => {
            const sut = makeSut();
            const signSpy = jest.spyOn(jwt, "sign");
            await sut.encrypt(plaintext);
            expect(signSpy).toHaveBeenCalledWith({ data: plaintext }, secret, {
                expiresIn: "1d",
            });
        });

        it("should return a token on sign success", async () => {
            const sut = makeSut();
            const accessToken = await sut.encrypt(plaintext);
            expect(accessToken).toBe(token);
        });

        it("should throw if sign throws", async () => {
            const sut = makeSut();
            jest.spyOn(jwt, "sign").mockImplementationOnce(throwError);
            const promise = sut.encrypt(plaintext);
            await expect(promise).rejects.toThrow();
        });
    });

    describe("decrypt()", () => {
        it("should call verify with correct values", async () => {
            const sut = makeSut();
            const verifySpy = jest.spyOn(jwt, "verify");
            await sut.decrypt(token);
            expect(verifySpy).toHaveBeenCalledWith(token, secret);
        });

        it("should return null if verify throws", async () => {
            const sut = makeSut();
            jest.spyOn(jwt, "verify").mockImplementationOnce(throwError);
            const data = await sut.decrypt(token);
            expect(data).toBeNull();
        });

        it("should return correct value on verify success", async () => {
            const sut = makeSut();
            const data = await sut.decrypt(token);
            expect(data).toBe(plaintext);
        });
    });
});
