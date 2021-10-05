import faker from "faker";

import { LoadUserByTokenRepositorySpy } from "@/data/mocks";

import { DbLoadUserByToken } from "./DbLoadUserByToken";

type SutTypes = {
    sut: DbLoadUserByToken;
    loadUserByTokenSpy: LoadUserByTokenRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByTokenSpy = new LoadUserByTokenRepositorySpy();
    const sut = new DbLoadUserByToken(loadUserByTokenSpy);

    return {
        sut,
        loadUserByTokenSpy,
    };
};
describe("DbLoadUserByToken", () => {
    it("should call LoadUserByTokenRepository with correct token", async () => {
        const { sut, loadUserByTokenSpy } = makeSut();
        const token = faker.datatype.uuid();
        await sut.load(token);
        expect(loadUserByTokenSpy.token).toBe(token);
    });
});
