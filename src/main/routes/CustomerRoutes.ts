import { Router } from "express";

import { adaptMiddleware, adaptRoute } from "@/main/adapters";
import {
    makeAddCustomerController,
    makeAuthMiddleware,
    makeLoadUserCustomersController,
} from "@/main/factories";

export default (router: Router): void => {
    router.post(
        "/customers",
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeAddCustomerController()),
    );
    router.get(
        "/customers",
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeLoadUserCustomersController()),
    );
};
