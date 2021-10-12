import { mockServiceProvidedModel } from "@/domain/mocks";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

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
