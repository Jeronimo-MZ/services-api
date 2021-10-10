import { ServiceProvided } from "@/domain/models/ServiceProvided";

export type AddServiceProvidedParams = {
    providerId: string;
    customerId: string;
    name: string;
    price: number;
    details?: string;
    paymentDate?: Date;
};

export interface AddServiceProvided {
    add(data: AddServiceProvidedParams): Promise<ServiceProvided | null>;
}
