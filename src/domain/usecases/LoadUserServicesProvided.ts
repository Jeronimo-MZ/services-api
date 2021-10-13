import { ServiceProvided } from "@/domain/models/ServiceProvided";

export interface LoadUserServicesProvided {
    load(userId: string): Promise<ServiceProvided[]>;
}
