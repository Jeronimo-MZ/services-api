import { Router } from "express";

import { adaptMiddleware, adaptRoute } from "@/main/adapters";
import {
    makeAddServiceProvidedController,
    makeAuthMiddleware,
    makeLoadUserServicesProvidedController,
} from "@/main/factories";

export default (router: Router): void => {
    router.post(
        "/services",
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeAddServiceProvidedController()),
    );

    router.get(
        "/services",
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeLoadUserServicesProvidedController()),
    );
};
