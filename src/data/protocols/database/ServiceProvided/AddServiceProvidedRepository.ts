import { ServiceProvided } from "@/domain/models";
import { AddServiceProvided } from "@/domain/usecases";

export interface AddServiceProvidedRepository {
    add(data: AddServiceProvided.Params): Promise<ServiceProvided>;
}
