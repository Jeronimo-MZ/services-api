import faker from "faker";
import jwt from "jsonwebtoken";

import { throwError } from "@/domain/mocks";

import { JwtAdapter } from "./JwtAdapter";

jest.mock("jsonwebtoken", () => ({
    sign: () => {
        return "any_token";
    },
}));

const secret = faker.random.alphaNumeric(50);
const plaintext = faker.datatype.uuid();

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
            expect(accessToken).toBe("any_token");
        });

        it("should throw if sign throws", async () => {
            const sut = makeSut();
            jest.spyOn(jwt, "sign").mockImplementationOnce(throwError);
            const promise = sut.encrypt(plaintext);
            await expect(promise).rejects.toThrow();
        });
    });
});
