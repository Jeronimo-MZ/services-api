import { v4 } from "uuid";

import { UUIDGenerator } from "@/data/protocols/cryptography";

export class UUIDAdapter implements UUIDGenerator {
    generate(): string {
        return v4();
    }
}
