import { LoadServicesProvidedByProviderIdRepository } from "@/data/protocols/database";
import { ServiceProvided } from "@/domain/models";
import { LoadUserServicesProvided } from "@/domain/usecases";

export class DbLoadUserServicesProvider implements LoadUserServicesProvided {
    constructor(
        private readonly loadServicesProvidedByProviderIdRepository: LoadServicesProvidedByProviderIdRepository,
    ) {}
    async load(userId: string): Promise<ServiceProvided[]> {
        return await this.loadServicesProvidedByProviderIdRepository.loadByProviderId(
            userId,
        );
    }
}
