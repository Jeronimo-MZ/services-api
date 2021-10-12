import { mockServiceProvidedModel } from "@/domain/mocks";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

import { AddServiceProvidedRepository } from "../protocols/database/ServiceProvided/AddServiceProvidedRepository";

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
