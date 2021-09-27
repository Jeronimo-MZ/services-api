export interface Hasher {
    hash(plaimtext: string): Promise<string>;
}
