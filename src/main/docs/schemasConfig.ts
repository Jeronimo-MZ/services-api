import {
    AddCustomerParamsSchema,
    AddCustomerResponseSchema,
    AddServiceProvidedParamsSchema,
    AddServiceProvidedResponseSchema,
    CustomerSchema,
    ErrorSchema,
    LoadUserCustomersResponseSchema,
    LoadUserServicesProvidedResponseSchema,
    LoginParamsSchema,
    LoginResponseSchema,
    ServiceProvidedSchema,
    SignUpParamsSchema,
    SignUpResponseSchema,
    UserSchema,
} from "@/main/docs/schemas";

const userSchemas = {
    loginParams: LoginParamsSchema,
    loginResponse: LoginResponseSchema,
    user: UserSchema,
    signUpParams: SignUpParamsSchema,
    signUpResponse: SignUpResponseSchema,
};

const customerSchemas = {
    addCustomerParams: AddCustomerParamsSchema,
    addCustomerResponse: AddCustomerResponseSchema,
    loadUserCustomersResponse: LoadUserCustomersResponseSchema,
    customer: CustomerSchema,
};

const serviceProvidedSchemas = {
    addServiceProvidedParams: AddServiceProvidedParamsSchema,
    addServiceProvidedResponse: AddServiceProvidedResponseSchema,
    serviceProvided: ServiceProvidedSchema,
    loadUserServicesProvidedResponse: LoadUserServicesProvidedResponseSchema,
};

export const schemas = {
    error: ErrorSchema,
    ...userSchemas,
    ...customerSchemas,
    ...serviceProvidedSchemas,
};
