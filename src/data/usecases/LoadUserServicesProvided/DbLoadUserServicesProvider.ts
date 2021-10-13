import { LoadServicesProvidedByProviderIdRepository } from "@/data/protocols/database/ServiceProvided/LoadServicesProvidedByProviderIdRepository";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { LoadUserServicesProvided } from "@/domain/usecases/LoadUserServicesProvided";

export class DbLoadUserServicesProvider implements LoadUserServicesProvided {
    constructor(
        private readonly loadServicesProvidedByProviderIdRepository: LoadServicesProvidedByProviderIdRepository,
    ) {}
    async load(userId: string): Promise<ServiceProvided[]> {
        await this.loadServicesProvidedByProviderIdRepository.loadByProviderId(
            userId,
        );
        return [];
    }
}
