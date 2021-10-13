import { AddServiceProvidedRepository } from "@/data/protocols/database/ServiceProvided/AddServiceProvidedRepository";
import { LoadServicesProvidedByProviderIdRepository } from "@/data/protocols/database/ServiceProvided/LoadServicesProvidedByProviderIdRepository";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

import { CollectionNames, MongoHelper } from "../../helpers";

export class ServiceProvidedMongoRepository
    implements
        AddServiceProvidedRepository,
        LoadServicesProvidedByProviderIdRepository
{
    async add({
        customerId,
        name,
        price,
        providerId,
        details,
        paymentDate,
    }: AddServiceProvided.Params): Promise<ServiceProvided> {
        const serviceProvidedCollection = await MongoHelper.getCollection(
            CollectionNames.SERVICE_PROVIDED,
        );

        const serviceProvided: AddServiceProvided.Params = {
            customerId,
            name,
            price,
            providerId,
            details,
            paymentDate,
        };

        await serviceProvidedCollection.insertOne(serviceProvided);

        return MongoHelper.map(serviceProvided);
    }

    async loadByProviderId(providerId: string): Promise<ServiceProvided[]> {
        const serviceProvidedCollection = await MongoHelper.getCollection(
            CollectionNames.SERVICE_PROVIDED,
        );
        const ServicesProvided = await serviceProvidedCollection
            .find({ providerId })
            .toArray();
        return ServicesProvided.map(MongoHelper.map);
    }
}
