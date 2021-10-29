import { writeFile } from "fs/promises";
import path from "path";

import { SaveFile } from "@/data/protocols/storage";

export class DiskStorage implements SaveFile {
    constructor(private readonly staticFilesDirectory: string) {}
    async save({ file, fileName }: SaveFile.Input): Promise<string> {
        await writeFile(
            path.resolve(this.staticFilesDirectory, fileName),
            file,
        );
        return fileName;
    }
}
