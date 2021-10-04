import faker from "faker";
import jwt from "jsonwebtoken";

import { JwtAdapter } from "./JwtAdapter";

describe("JwtAdapter", () => {
    describe("encrypt()", () => {
        it("should calls sign with correct values", async () => {
            const secret = faker.random.alphaNumeric(50);
            const sut = new JwtAdapter(secret);
            const plaintext = faker.datatype.uuid();
            const signSpy = jest.spyOn(jwt, "sign");
            await sut.encrypt(plaintext);
            expect(signSpy).toHaveBeenCalledWith({ data: plaintext }, secret, {
                expiresIn: "1d",
            });
        });
    });
});
