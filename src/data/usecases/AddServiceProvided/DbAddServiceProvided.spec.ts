import {
    AddServiceProvidedRepositorySpy,
    LoadCustomerByIdRepositorySpy,
} from "@/data/mocks";
import { mockAddServiceProvidedParams, throwError } from "@/domain/mocks";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";
import { InvalidParamError } from "@/presentation/errors";

import { DbAddServiceProvided } from "./DbAddServiceProvided";

type SutTypes = {
    sut: DbAddServiceProvided;
    loadCustomerByIdRepositorySpy: LoadCustomerByIdRepositorySpy;
    addServiceProvidedRepositorySpy: AddServiceProvidedRepositorySpy;
    params: AddServiceProvided.Params;
};
const makeSut = (): SutTypes => {
    const loadCustomerByIdRepositorySpy = new LoadCustomerByIdRepositorySpy();
    const addServiceProvidedRepositorySpy =
        new AddServiceProvidedRepositorySpy();
    const params = mockAddServiceProvidedParams();
    params.providerId =
        loadCustomerByIdRepositorySpy.result?.providerId || params.providerId;
    const sut = new DbAddServiceProvided(
        loadCustomerByIdRepositorySpy,
        addServiceProvidedRepositorySpy,
    );

    return {
        sut,
        loadCustomerByIdRepositorySpy,
        addServiceProvidedRepositorySpy,
        params,
    };
};

describe("DbAddServiceProvided", () => {
    it("should call LoadCustomerByIdRepository with correct id", async () => {
        const { sut, loadCustomerByIdRepositorySpy, params } = makeSut();
        await sut.add(params);
        expect(loadCustomerByIdRepositorySpy.id).toBe(params.customerId);
    });

    it("should return an Error if LoadCustomerByIdRepository returns null", async () => {
        const { sut, loadCustomerByIdRepositorySpy, params } = makeSut();
        loadCustomerByIdRepositorySpy.result = null;
        const serviceProvided = await sut.add(params);
        expect(serviceProvided).toEqual(new InvalidParamError("customerId"));
    });

    it("should throw if LoadCustomerByIdRepository throws", async () => {
        const { sut, loadCustomerByIdRepositorySpy, params } = makeSut();
        jest.spyOn(
            loadCustomerByIdRepositorySpy,
            "loadById",
        ).mockImplementationOnce(throwError);
        const promise = sut.add(params);
        await expect(promise).rejects.toThrow();
    });

    it("should return an Error if customer providerId and the given providerId are different", async () => {
        const { sut, params } = makeSut();
        params.providerId = "different_id";
        const serviceProvided = await sut.add(params);
        expect(serviceProvided).toEqual(new InvalidParamError("providerId"));
    });

    it("should call AddServiceProvidedRepository with correct values", async () => {
        const { sut, addServiceProvidedRepositorySpy, params } = makeSut();
        await sut.add(params);
        expect(addServiceProvidedRepositorySpy.params).toEqual(params);
    });

    it("should throw if AddServiceProvidedRepository throws", async () => {
        const { sut, addServiceProvidedRepositorySpy, params } = makeSut();
        jest.spyOn(
            addServiceProvidedRepositorySpy,
            "add",
        ).mockImplementationOnce(throwError);
        const promise = sut.add(params);
        await expect(promise).rejects.toThrow();
    });

    it("should return a ServiceProvided on success", async () => {
        const {
            sut,
            loadCustomerByIdRepositorySpy,
            addServiceProvidedRepositorySpy,
            params,
        } = makeSut();
        params.providerId = loadCustomerByIdRepositorySpy.result
            ?.providerId as string;
        const serviceProvided = await sut.add(params);
        expect(serviceProvided).toEqual(addServiceProvidedRepositorySpy.result);
    });
});
