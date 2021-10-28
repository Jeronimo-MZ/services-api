import faker from "faker";

import { SaveFile } from "../protocols/Storage";

export class SaveFileSpy implements SaveFile {
    file: Buffer;
    fileName: string;
    output: SaveFile.Output = faker.system.filePath();

    async save({ file, fileName }: SaveFile.Input): Promise<SaveFile.Output> {
        this.file = file;
        this.fileName = fileName;
        return this.output;
    }
}
