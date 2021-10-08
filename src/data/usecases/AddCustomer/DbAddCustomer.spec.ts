import { UnexpectedError } from "@/data/errors/UnexpectedError";
import {
    AddCustomerRepositorySpy,
    LoadUserByIdRepositorySpy,
} from "@/data/mocks";
import { mockAddCustomerParams, throwError } from "@/domain/mocks";

import { DbAddCustomer } from "./DbAddCustomer";

type SutTypes = {
    sut: DbAddCustomer;
    loadUserByIdRepositorySpy: LoadUserByIdRepositorySpy;
    addCustomerRepositorySpy: AddCustomerRepositorySpy;
};

const makeSut = (): SutTypes => {
    const loadUserByIdRepositorySpy = new LoadUserByIdRepositorySpy();
    const addCustomerRepositorySpy = new AddCustomerRepositorySpy();
    const sut = new DbAddCustomer(
        loadUserByIdRepositorySpy,
        addCustomerRepositorySpy,
    );
    return {
        sut,
        loadUserByIdRepositorySpy,
        addCustomerRepositorySpy,
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

    it("should throw if LoadUserByIdRepository throws", async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        jest.spyOn(
            loadUserByIdRepositorySpy,
            "loadById",
        ).mockImplementationOnce(throwError);
        const promise = sut.add(mockAddCustomerParams());
        await expect(promise).rejects.toThrow();
    });

    it("should throw UnexpectedError if LoadUserByIdRepository returns null", async () => {
        const { sut, loadUserByIdRepositorySpy } = makeSut();
        loadUserByIdRepositorySpy.result = null;
        const promise = sut.add(mockAddCustomerParams());
        await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
    });

    it("should call AddCustomerRepository with correct values", async () => {
        const { sut, addCustomerRepositorySpy } = makeSut();
        const addCustomerParams = mockAddCustomerParams();
        await sut.add(addCustomerParams);
        expect(addCustomerRepositorySpy.params).toEqual(addCustomerParams);
    });

    it("should throw if AddCustomerRepository throws", async () => {
        const { sut, addCustomerRepositorySpy } = makeSut();
        jest.spyOn(addCustomerRepositorySpy, "add").mockImplementationOnce(
            throwError,
        );
        const promise = sut.add(mockAddCustomerParams());
        await expect(promise).rejects.toThrow();
    });

    it("should return a Customer on success", async () => {
        const { sut, addCustomerRepositorySpy } = makeSut();
        const customer = await sut.add(mockAddCustomerParams());
        expect(customer).toEqual(addCustomerRepositorySpy.result);
    });
});
