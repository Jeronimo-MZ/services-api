import { Router } from "express";

import { adaptMiddleware } from "@/main/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeAddCustomerController } from "@/main/factories/controllers/Customer/AddCustomer/AddCustomerControllerFactory";
import { makeAuthMiddleware } from "@/main/factories/middlewares/AuthMiddlewareFactory";

import { makeLoadUserCustomersController } from "../factories/controllers/Customer/LoadUserCustomers/LoadUserCustomersControllerFactory";

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
