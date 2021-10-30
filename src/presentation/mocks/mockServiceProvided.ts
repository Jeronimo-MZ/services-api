import { mockServiceProvidedModel } from "@/domain/mocks";
import { ServiceProvided } from "@/domain/models";
import {
    AddServiceProvided,
    LoadUserServicesProvided,
} from "@/domain/usecases";

export class AddServiceProviderSpy implements AddServiceProvided {
    result: ServiceProvided | Error = mockServiceProvidedModel();
    params: AddServiceProvided.Params;

    async add(
        params: AddServiceProvided.Params,
    ): Promise<ServiceProvided | Error> {
        this.params = params;
        return this.result;
    }
}

export class LoadUserServicesProvidedSpy implements LoadUserServicesProvided {
    userId: string;
    result: ServiceProvided[] = [
        mockServiceProvidedModel(),
        mockServiceProvidedModel(),
    ];

    async load(userId: string): Promise<ServiceProvided[]> {
        this.userId = userId;
        return this.result;
    }
}
