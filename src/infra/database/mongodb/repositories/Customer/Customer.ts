import {
    AddCustomerRepository,
    LoadCustomersByProviderIdRepository,
} from "@/data/protocols/database/Customer";
import { Customer } from "@/domain/models/Customer";
import { AddCustomerParams } from "@/domain/usecases/AddCustomer";
import { CollectionNames, MongoHelper } from "@/infra/database/mongodb/helpers";

export class CustomerMongoRepository
    implements AddCustomerRepository, LoadCustomersByProviderIdRepository
{
    async add({
        institution,
        name,
        providerId,
    }: AddCustomerParams): Promise<Customer> {
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
            .toArray()) as Customer[];
        return customers.map(MongoHelper.map);
    }
}
