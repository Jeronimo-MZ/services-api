import { hash } from "bcrypt";

import { Hasher } from "@/data/protocols/cryptography";

export class BcryptAdapter implements Hasher {
    constructor(private readonly salt: number) {}
    async hash(plaintext: string): Promise<string> {
        hash(plaintext, this.salt);

        return null as unknown as string;
    }
}
