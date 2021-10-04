import faker from "faker";
import jwt from "jsonwebtoken";

import { JwtAdapter } from "./JwtAdapter";

jest.mock("jsonwebtoken", () => ({
    sign: () => {
        return "any_token";
    },
}));

const secret = faker.random.alphaNumeric(50);

const makeSut = (): JwtAdapter => {
    return new JwtAdapter(secret);
};

describe("JwtAdapter", () => {
    describe("encrypt()", () => {
        it("should calls sign with correct values", async () => {
            const sut = makeSut();
            const plaintext = faker.datatype.uuid();
            const signSpy = jest.spyOn(jwt, "sign");
            await sut.encrypt(plaintext);
            expect(signSpy).toHaveBeenCalledWith({ data: plaintext }, secret, {
                expiresIn: "1d",
            });
        });

        it("should return a token on sign success", async () => {
            const sut = makeSut();
            const plaintext = faker.datatype.uuid();
            const accessToken = await sut.encrypt(plaintext);
            expect(accessToken).toBe("any_token");
        });
    });
});
