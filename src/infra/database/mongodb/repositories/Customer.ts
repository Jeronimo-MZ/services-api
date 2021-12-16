import { ObjectID } from "bson";

import {
    AddCustomerRepository,
    LoadCustomerByIdRepository,
    LoadCustomersByProviderIdRepository,
} from "@/data/protocols/database";
import { Customer } from "@/domain/models";
import { AddCustomer } from "@/domain/usecases";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb";

export class CustomerMongoRepository
    implements
        AddCustomerRepository,
        LoadCustomersByProviderIdRepository,
        LoadCustomerByIdRepository
{
    async add({
        institution,
        name,
        providerId,
    }: AddCustomer.Params): Promise<Customer> {
        const customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        const customerData: Omit<Customer, "id"> = {
            name,
            institution,
            phone: null,
            providerId,
        };

        await customersCollection.insertOne(customerData);

        return MongoHelper.map({
            ...customerData,
        });
    }

    async loadByProviderId(providerId: string): Promise<Customer[]> {
        const customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        const customers = (await customersCollection
            .find({
                providerId: providerId,
            })
            .toArray()) as unknown as Customer[];
        return customers.map(MongoHelper.map);
    }

    async loadById(id: string): Promise<Customer | null> {
        const customersCollection = await MongoHelper.getCollection(
            CollectionNames.CUSTOMER,
        );
        const customer = await customersCollection.findOne({
            _id: new ObjectID(id),
        });
        if (!customer) return null;
        return MongoHelper.map(customer);
    }
}
