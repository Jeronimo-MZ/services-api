import { AddCustomerRepository } from "@/data/protocols/database/Customer";
import { Customer } from "@/domain/models/Customer";
import { AddCustomerParams } from "@/domain/usecases/AddCustomer";

import { CollectionNames, MongoHelper } from "../../helpers";

export class CustomerMongoRepository implements AddCustomerRepository {
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

        const { insertedId } = await customersCollection.insertOne(
            customerData,
        );

        const user = await customersCollection.findOne(insertedId);
        return MongoHelper.map({
            ...user,
        });
    }
}
