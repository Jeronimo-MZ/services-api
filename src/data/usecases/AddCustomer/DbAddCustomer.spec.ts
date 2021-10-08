import { LoadUserByIdRepositorySpy } from "@/data/mocks";
import { mockAddCustomerParams } from "@/domain/mocks";

import { DbAddCustomer } from "./DbAddCustomer";

type SutTypes = {
    sut: DbAddCustomer;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const sut = new DbAddCustomer(loadUserByIdRepositorySpy);
    return {
        sut,
        loadUserByIdRepositorySpy,
    };
};

describe("DbAddUser", () => {
    it("should call LoadUserByIdRepository with correct id", async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        const addCustomerParams = mockAddCustomerParams();
        await sut.add(addCustomerParams);
        expect(loadUserByIdRepositorySpy.id).toEqual(
            addCustomerParams.providerId,
        );
    });
});
