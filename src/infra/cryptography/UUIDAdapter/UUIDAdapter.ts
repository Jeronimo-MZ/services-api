import { v4 } from "uuid";

import { UUIDGenerator } from "@/data/protocols/cryptography/UUIDGenerator";

export class UUIDAdapter implements UUIDGenerator {
    generate(): string {
        v4();
        return undefined as any;
    }
}
