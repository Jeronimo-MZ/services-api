export interface DeleteFile {
    delete({ fileName }: DeleteFile.Input): Promise<void>;
}

export namespace DeleteFile {
    export type Input = {
        fileName: string;
    };
}
