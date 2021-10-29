import faker from "faker";
import { writeFile } from "fs/promises";
import path from "path";

import { SaveFile } from "@/data/protocols/storage";

import { DiskStorage } from "./DiskStorage";

jest.mock("fs/promises");

type SutTypes = {
    sut: DiskStorage;
};
const staticFilesDirectory = faker.system.directoryPath();
const makeSut = (): SutTypes => {
    const sut = new DiskStorage(staticFilesDirectory);
    return {
        sut,
    };
};

const makeSaveFileInput = (): SaveFile.Input => ({
    file: Buffer.from(faker.datatype.string()),
    fileName: faker.system.fileName(),
});

describe("DiskStorage", () => {
    describe("saveFile()", () => {
        it("should call writeFile with correct values", async () => {
            const { sut } = makeSut();
            const input = makeSaveFileInput();
            await sut.save(input);
            expect(writeFile).toHaveBeenCalledWith(
                path.resolve(staticFilesDirectory, input.fileName),
                input.file,
            );
        });
    });
});
