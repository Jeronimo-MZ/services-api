import { LoadCustomerByIdRepositorySpy } from "@/data/mocks";
import { mockAddServiceProvidedParams } from "@/domain/mocks";

import { DbAddServiceProvided } from "./DbAddServiceProvided";

type SutTypes = {
    sut: DbAddServiceProvided;
    loadCustomerByIdRepositorySpy: LoadCustomerByIdRepositorySpy;
};
const makeSut = (): SutTypes => {
    const loadCustomerByIdRepositorySpy = new LoadCustomerByIdRepositorySpy();
    const sut = new DbAddServiceProvided(loadCustomerByIdRepositorySpy);

    return {
        sut,
        loadCustomerByIdRepositorySpy,
    };
};

describe("DbAddServiceProvided", () => {
    it("should call LoadCustomerByIdRepository with correct id", async () => {
        const { sut, loadCustomerByIdRepositorySpy } = makeSut();
        const params = mockAddServiceProvidedParams();
        await sut.add(params);
        expect(loadCustomerByIdRepositorySpy.id).toBe(params.customerId);
    });
});
