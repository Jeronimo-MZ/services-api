import {
    AddServiceProvidedRepository,
    LoadServicesProvidedByProviderIdRepository,
} from "@/data/protocols/database";
import { ServiceProvided } from "@/domain/models";
import { AddServiceProvided } from "@/domain/usecases";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";

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
