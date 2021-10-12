import { mockServiceProvidedModel } from "@/domain/mocks";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

export class AddServiceProviderSpy implements AddServiceProvided {
    result: ServiceProvided = mockServiceProvidedModel();
    params: AddServiceProvided.Params;

    async add(
        params: AddServiceProvided.Params,
    ): Promise<ServiceProvided | null> {
        this.params = params;
        return this.result;
    }
}
