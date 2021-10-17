import {
    customerPath,
    loginPath,
    serviceProvidedPath,
    showUserPath,
    SignUpPath,
} from "@/main/docs/paths";

export const paths = {
    "/login": loginPath,
    "/signup": SignUpPath,
    "/customers": customerPath,
    "/services": serviceProvidedPath,
    "/users/me": showUserPath,
};
