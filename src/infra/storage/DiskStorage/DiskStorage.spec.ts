import faker from "faker";
import { writeFile } from "fs/promises";
import path from "path";
import { mocked } from "ts-jest/utils";

import { SaveFile } from "@/data/protocols/storage";
import { throwError } from "@/domain/mocks";

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

        it("should throw if writeFile throws", async () => {
            const { sut } = makeSut();
            mocked(writeFile).mockImplementationOnce(throwError);
            const input = makeSaveFileInput();
            const promise = sut.save(input);
            expect(promise).rejects.toThrow();
        });
    });
});
