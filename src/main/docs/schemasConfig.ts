import {
    AddCustomerParamsSchema,
    AddCustomerResponseSchema,
    ErrorSchema,
    LoginParamsSchema,
    LoginResponseSchema,
    SignUpParamsSchema,
    SignUpResponseSchema,
    UserSchema,
} from "@/main/docs/schemas";

export const schemas = {
    loginParams: LoginParamsSchema,
    loginResponse: LoginResponseSchema,
    error: ErrorSchema,
    user: UserSchema,
    signUpParams: SignUpParamsSchema,
    signUpResponse: SignUpResponseSchema,
    addCustomerParams: AddCustomerParamsSchema,
    addCustomerResponse: AddCustomerResponseSchema,
};
