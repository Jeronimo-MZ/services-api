import { ServiceProvided } from "@/domain/models/ServiceProvided";

export interface LoadServicesProvidedByProviderIdRepository {
    loadByProviderId(providerId: string): Promise<ServiceProvided[]>;
}
