import { sign, verify } from "jsonwebtoken";

import { Encrypter } from "@/data/protocols/cryptography";
import { Decrypter } from "@/data/protocols/cryptography/Decrypter";

export class JwtAdapter implements Encrypter, Decrypter {
    constructor(private readonly secret: string) {}

    async encrypt(plaintext: string): Promise<string> {
        return await sign({ data: plaintext }, this.secret, {
            expiresIn: "1d",
        });
    }

    async decrypt(token: string): Promise<string | null> {
        try {
            await verify(token, this.secret);
        } catch {
            return null;
        }
        return null;
    }
}
