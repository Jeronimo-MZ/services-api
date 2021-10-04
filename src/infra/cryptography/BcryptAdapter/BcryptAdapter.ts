import { compare, hash } from "bcrypt";

import { HashComparer, Hasher } from "@/data/protocols/cryptography";

export class BcryptAdapter implements Hasher, HashComparer {
    constructor(private readonly salt: number) {}
    async hash(plaintext: string): Promise<string> {
        return await hash(plaintext, this.salt);
    }

    async compare(plaintext: string, digest: string): Promise<boolean> {
        return await compare(plaintext, digest);
    }
}
