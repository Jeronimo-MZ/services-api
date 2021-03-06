import faker from "faker";

import {
    Decrypter,
    Encrypter,
    HashComparer,
    Hasher,
    UUIDGenerator,
} from "@/data/protocols/cryptography";

export class HasherSpy implements Hasher {
    digest = faker.datatype.uuid();
    plaintext: string;

    async hash(plaintext: string): Promise<string> {
        this.plaintext = plaintext;
        return this.digest;
    }
}

export class HashComparerSpy implements HashComparer {
    plaintext: string;
    digest: string;
    isValid = true;

    async compare(plaintext: string, digest: string): Promise<boolean> {
        this.plaintext = plaintext;
        this.digest = digest;
        return this.isValid;
    }
}

export class EncrypterSpy implements Encrypter {
    ciphertext = faker.datatype.uuid();
    plaintext: string;

    async encrypt(plaintext: string): Promise<string> {
        this.plaintext = plaintext;
        return this.ciphertext;
    }
}

export class DecrypterSpy implements Decrypter {
    plaintext: string | null = faker.internet.password();
    ciphertext: string;

    async decrypt(ciphertext: string): Promise<string | null> {
        this.ciphertext = ciphertext;
        return this.plaintext;
    }
}

export class UUIDGeneratorSpy implements UUIDGenerator {
    uuid: string = faker.datatype.uuid();
    generate(): string {
        return this.uuid;
    }
}
