import { Router } from "express";

import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeAddCustomerController } from "@/main/factories/controllers/Customer/AddCustomer/AddCustomerControllerFactory";

import { adaptMiddleware } from "../adapters/ExpressMiddlewareAdapter";
import { makeAuthMiddleware } from "../factories/middlewares/AuthMiddlewareFactory";

export default (router: Router): void => {
    router.post(
        "/customers",
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeAddCustomerController()),
    );
};
