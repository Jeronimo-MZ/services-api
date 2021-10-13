import { Router } from "express";

import { adaptMiddleware } from "@/main/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeAddServiceProvidedController } from "@/main/factories/controllers/ServiceProvided/AddServiceProvided/AddServiceProvided";
import { makeAuthMiddleware } from "@/main/factories/middlewares/AuthMiddlewareFactory";

export default (router: Router): void => {
    router.post(
        "/services",
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeAddServiceProvidedController()),
    );
};