import { Router } from "express";

import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeSignUpController } from "@/main/factories/controllers/User/SignUp/SignUpControllerFactory";

import { makeLoginController } from "../factories/controllers/User/Login/LoginControllerFactory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeSignUpController()));
    router.get("/login", adaptRoute(makeLoginController()));
};
