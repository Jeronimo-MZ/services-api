import { ServiceProvided } from "@/domain/models";

export interface LoadServicesProvidedByProviderIdRepository {
    loadByProviderId(providerId: string): Promise<ServiceProvided[]>;
}
