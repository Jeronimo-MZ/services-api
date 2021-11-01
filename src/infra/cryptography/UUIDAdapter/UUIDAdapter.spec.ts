import { randomUUID } from "crypto";
import faker from "faker";
import { mocked } from "ts-jest/utils";

import { throwError } from "@/domain/mocks";

import { UUIDAdapter } from "./UUIDAdapter";

const generatedUUID = faker.datatype.uuid();
jest.mock("crypto");
mocked(randomUUID).mockReturnValue(generatedUUID);

const makeSut = () => new UUIDAdapter();

describe("UUIDAdapter", () => {
    it("should call crypto.randomUUID", () => {
        const sut = makeSut();
        sut.generate();
        expect(randomUUID).toHaveBeenCalledTimes(1);
    });

    it("should return correct uuid", () => {
        const sut = makeSut();
        const uuid = sut.generate();
        expect(uuid).toBe(generatedUUID);
    });

    it("should throw if crypto.randomUUID throws", () => {
        const sut = makeSut();
        mocked(randomUUID).mockImplementationOnce(throwError);
        expect(sut.generate).toThrow();
    });
});
