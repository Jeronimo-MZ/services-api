import { ServiceProvided } from "@/domain/models";

export interface LoadUserServicesProvided {
    load(userId: string): Promise<ServiceProvided[]>;
}
