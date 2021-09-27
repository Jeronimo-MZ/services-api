export interface Hasher {
    hash(payload: string): Promise<string>;
}
