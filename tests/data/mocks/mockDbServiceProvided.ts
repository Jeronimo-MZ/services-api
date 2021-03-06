import {
    AddServiceProvidedRepository,
    LoadServicesProvidedByProviderIdRepository,
} from "@/data/protocols/database";
import { ServiceProvided } from "@/domain/models";
import { AddServiceProvided } from "@/domain/usecases";
import { mockServiceProvidedModel } from "@/tests/domain/mocks";

export class AddServiceProvidedRepositorySpy
    implements AddServiceProvidedRepository
{
    params: AddServiceProvided.Params;
    result: ServiceProvided = mockServiceProvidedModel();

    async add(params: AddServiceProvided.Params): Promise<ServiceProvided> {
        this.params = params;
        return this.result;
    }
}

export class LoadServicesProvidedByProviderIdRepositorySpy
    implements LoadServicesProvidedByProviderIdRepository
{
    providerId: string;
    result: ServiceProvided[] = [
        mockServiceProvidedModel(),
        mockServiceProvidedModel(),
        mockServiceProvidedModel(),
    ];

    async loadByProviderId(providerId: string): Promise<ServiceProvided[]> {
        this.providerId = providerId;
        return this.result;
    }
}
