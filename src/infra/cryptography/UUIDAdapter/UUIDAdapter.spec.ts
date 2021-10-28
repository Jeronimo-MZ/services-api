import faker from "faker";
import { mocked } from "ts-jest/utils";
import { v4 } from "uuid";

import { UUIDAdapter } from "./UUIDAdapter";

const generatedUUID = faker.datatype.uuid();
jest.mock("uuid");
mocked(v4).mockReturnValue(generatedUUID);

const makeSut = () => new UUIDAdapter();

describe("UUIDAdapter", () => {
    it("should call uuid.v4", () => {
        const sut = makeSut();
        sut.generate();
        expect(v4).toHaveBeenCalledTimes(1);
    });

    it("should return correct uuid", () => {
        const sut = makeSut();
        const uuid = sut.generate();
        expect(uuid).toBe(generatedUUID);
    });
});
