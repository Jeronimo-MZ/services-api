export interface SaveFile {
    save(input: SaveFile.Input): Promise<SaveFile.Output>;
}

export namespace SaveFile {
    export type Input = { file: Buffer; fileName: string };
    export type Output = string;
}
