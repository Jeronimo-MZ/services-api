import { Hasher } from "../protocols/cryptography/Hasher";

export const mockHasher = (): Hasher => {
    class HasherStub implements Hasher {
        async hash(_payload: string): Promise<string> {
            return "hash";
        }
    }

    return new HasherStub();
};
