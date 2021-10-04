export interface Encryter {
    encrypt(plaintext: string): Promise<string | null>;
}
