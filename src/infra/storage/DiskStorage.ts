import { unlink, writeFile } from "fs/promises";
import path from "path";

import { DeleteFile, SaveFile } from "@/data/protocols/storage";

export class DiskStorage implements SaveFile, DeleteFile {
    constructor(private readonly staticFilesDirectory: string) {}

    async save({ file, fileName }: SaveFile.Input): Promise<string> {
        await writeFile(
            path.resolve(this.staticFilesDirectory, fileName),
            file,
        );
        return fileName;
    }

    async delete({ fileName }: DeleteFile.Input): Promise<void> {
        await unlink(path.resolve(this.staticFilesDirectory, fileName));
    }
}
