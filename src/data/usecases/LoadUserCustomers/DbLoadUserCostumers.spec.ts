import faker from "faker";

import { LoadCustomersByProviderIdRepositorySpy } from "@/data/mocks";

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
});
