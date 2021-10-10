import { ServiceProvided } from "@/domain/models/ServiceProvided";

export interface AddServiceProvided {
    add(data: AddServiceProvided.Params): Promise<ServiceProvided | null>;
}

export namespace AddServiceProvided {
    export type Params = {
        providerId: string;
        customerId: string;
        name: string;
        price: number;
        details?: string;
        paymentDate?: Date;
    };
}
