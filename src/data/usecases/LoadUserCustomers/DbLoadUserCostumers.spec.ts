import faker from "faker";

import { LoadCustomersByProviderIdRepositorySpy } from "@/data/mocks";
import { throwError } from "@/domain/mocks";

import { DbLoadUserCustomers } from "./DbLoadUserCustomers";

type SutTypes = {
    sut: DbLoadUserCustomers;
    loadCustomerByProviderIdRepositorySpy: LoadCustomersByProviderIdRepositorySpy;
    userId: string;
};

const makeSut = (): SutTypes => {
    const loadCustomerByProviderIdRepositorySpy =
        new LoadCustomersByProviderIdRepositorySpy();
    const sut = new DbLoadUserCustomers(loadCustomerByProviderIdRepositorySpy);
    const userId = faker.datatype.uuid();

    return {
        sut,
        loadCustomerByProviderIdRepositorySpy,
        userId,
    };
};
describe("DbUserCustomers", () => {
    it("should call LoadCustomerByProviderIdRepository with correct id", async () => {
        const { sut, loadCustomerByProviderIdRepositorySpy, userId } =
            makeSut();
        await sut.load(userId);
        expect(loadCustomerByProviderIdRepositorySpy.providerId).toBe(userId);
    });

    it("should throw if LoadCustomerByProviderIdRepository throws", async () => {
        const { sut, loadCustomerByProviderIdRepositorySpy, userId } =
            makeSut();
        jest.spyOn(
            loadCustomerByProviderIdRepositorySpy,
            "loadByProviderId",
        ).mockImplementationOnce(throwError);
        const promise = sut.load(userId);
        await expect(promise).rejects.toThrow();
    });

    it("should return user customers on success", async () => {
        const { sut, loadCustomerByProviderIdRepositorySpy, userId } =
            makeSut();
        const customers = await sut.load(userId);
        expect(customers).toBe(loadCustomerByProviderIdRepositorySpy.result);
    });
});
