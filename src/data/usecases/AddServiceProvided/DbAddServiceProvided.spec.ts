import { LoadCustomerByIdRepositorySpy } from "@/data/mocks";
import { AddServiceProvidedRepositorySpy } from "@/data/mocks/mockDbServiceProvided";
import { mockAddServiceProvidedParams, throwError } from "@/domain/mocks";

import { DbAddServiceProvided } from "./DbAddServiceProvided";

type SutTypes = {
    sut: DbAddServiceProvided;
    loadCustomerByIdRepositorySpy: LoadCustomerByIdRepositorySpy;
    addServiceProvidedRepositorySpy: AddServiceProvidedRepositorySpy;
};
const makeSut = (): SutTypes => {
    const loadCustomerByIdRepositorySpy = new LoadCustomerByIdRepositorySpy();
    const addServiceProvidedRepositorySpy =
        new AddServiceProvidedRepositorySpy();
    const sut = new DbAddServiceProvided(
        loadCustomerByIdRepositorySpy,
        addServiceProvidedRepositorySpy,
    );

    return {
        sut,
        loadCustomerByIdRepositorySpy,
        addServiceProvidedRepositorySpy,
    };
};

describe("DbAddServiceProvided", () => {
    it("should call LoadCustomerByIdRepository with correct id", async () => {
        const { sut, loadCustomerByIdRepositorySpy } = makeSut();
        const params = mockAddServiceProvidedParams();
        await sut.add(params);
        expect(loadCustomerByIdRepositorySpy.id).toBe(params.customerId);
    });

    it("should return null if LoadCustomerByIdRepository returns null", async () => {
        const { sut, loadCustomerByIdRepositorySpy } = makeSut();
        loadCustomerByIdRepositorySpy.result = null;
        const serviceProvided = await sut.add(mockAddServiceProvidedParams());
        expect(serviceProvided).toBeNull();
    });

    it("should throw if LoadCustomerByIdRepository throws", async () => {
        const { sut, loadCustomerByIdRepositorySpy } = makeSut();
        jest.spyOn(
            loadCustomerByIdRepositorySpy,
            "loadById",
        ).mockImplementationOnce(throwError);
        const promise = sut.add(mockAddServiceProvidedParams());
        await expect(promise).rejects.toThrow();
    });

    it("should return null if customer providerId and the given providerId are different", async () => {
        const { sut } = makeSut();
        const params = mockAddServiceProvidedParams();
        params.providerId = "different_id";
        const serviceProvided = await sut.add(params);
        expect(serviceProvided).toBeNull();
    });

    it("should call AddServiceProvidedRepository with correct values", async () => {
        const { sut, addServiceProvidedRepositorySpy } = makeSut();
        const params = mockAddServiceProvidedParams();
        await sut.add(params);
        expect(addServiceProvidedRepositorySpy.params).toEqual(params);
    });
});
