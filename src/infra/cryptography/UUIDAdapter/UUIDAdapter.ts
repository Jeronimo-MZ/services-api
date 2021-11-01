import { randomUUID } from "crypto";

import { UUIDGenerator } from "@/data/protocols/cryptography";

export class UUIDAdapter implements UUIDGenerator {
    generate(): string {
        return randomUUID();
    }
}
