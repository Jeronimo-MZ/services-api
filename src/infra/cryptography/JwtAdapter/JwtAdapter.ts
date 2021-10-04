import { sign } from "jsonwebtoken";

import { Encrypter } from "@/data/protocols/cryptography";

export class JwtAdapter implements Encrypter {
    constructor(private readonly secret: string) {}

    async encrypt(plaintext: string): Promise<string> {
        return await sign({ data: plaintext }, this.secret, {
            expiresIn: "1d",
        });
    }
}
