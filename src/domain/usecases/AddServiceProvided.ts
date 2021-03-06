import { ServiceProvided } from "@/domain/models";

export interface AddServiceProvided {
    add(data: AddServiceProvided.Params): Promise<ServiceProvided | Error>;
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
