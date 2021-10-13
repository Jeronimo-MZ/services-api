import faker from "faker";

import { LoadServicesProvidedByProviderIdRepositorySpy } from "@/data/mocks";

import { DbLoadUserServicesProvider } from "./DbLoadUserServicesProvider";

type SutTypes = {
    sut: DbLoadUserServicesProvider;
    loadServicesProvidedByProviderIdRepositorySpy: LoadServicesProvidedByProviderIdRepositorySpy;
    userId: string;
};

const makeSut = (): SutTypes => {
    const loadServicesProvidedByProviderIdRepositorySpy =
        new LoadServicesProvidedByProviderIdRepositorySpy();
    const sut = new DbLoadUserServicesProvider(
        loadServicesProvidedByProviderIdRepositorySpy,
    );
    const userId = faker.datatype.uuid();

    return {
        sut,
        loadServicesProvidedByProviderIdRepositorySpy,
        userId,
    };
};
describe("DbLoadUserServicesProvided", () => {
    it("should call LoadServicesProvidedByProviderIdRepository with correct id", async () => {
        const { sut, loadServicesProvidedByProviderIdRepositorySpy, userId } =
            makeSut();
        await sut.load(userId);
        expect(loadServicesProvidedByProviderIdRepositorySpy.providerId).toBe(
            userId,
        );
    });
});
