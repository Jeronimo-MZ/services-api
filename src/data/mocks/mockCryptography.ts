import faker from "faker";

import { Hasher } from "../protocols/cryptography/Hasher";

export const mockHasher = (): Hasher => {
    class HasherStub implements Hasher {
        async hash(_payload: string): Promise<string> {
            return faker.random.alphaNumeric(30);
        }
    }

    return new HasherStub();
};
