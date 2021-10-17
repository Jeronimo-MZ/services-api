import {
    badRequest,
    forbidden,
    notFound,
    serverError,
    unauthorized,
} from "@/main/docs/components";

import { apiKeyAuthSchema } from "./schemas";

export const components = {
    securitySchemes: {
        apiKeyAuth: apiKeyAuthSchema,
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden,
};
