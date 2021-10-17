import {
    ErrorSchema,
    LoginParamsSchema,
    LoginResponseSchema,
} from "@/main/docs/schemas";

export const schemas = {
    loginParams: LoginParamsSchema,
    loginResponse: LoginResponseSchema,
    error: ErrorSchema,
};
