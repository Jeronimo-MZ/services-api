import { ServiceProvided } from "@/domain/models/ServiceProvided";
import { AddServiceProvided } from "@/domain/usecases/AddServiceProvided";

export interface AddServiceProvidedRepository {
    add(data: AddServiceProvided.Params): Promise<ServiceProvided>;
}
