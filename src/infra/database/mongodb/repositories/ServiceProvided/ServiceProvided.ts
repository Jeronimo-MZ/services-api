import { AddServiceProvidedRepository } from "@/data/protocols/database/ServiceProvided/AddServiceProvidedRepository";
import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

import { CollectionNames, MongoHelper } from "../../helpers";

export class ServiceProvidedMongoRepository
    implements AddServiceProvidedRepository
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
}
