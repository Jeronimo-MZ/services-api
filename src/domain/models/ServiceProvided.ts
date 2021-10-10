export type ServiceProvided = {
    id: string;
    providerId: string;
    customerId: string;
    name: string;
    price: number;
    details: string | null;
    paymentDate: Date | null;
};
