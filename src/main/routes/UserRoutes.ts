import { Router } from "express";

import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeLoginController } from "@/main/factories/controllers/User/Login/LoginControllerFactory";
import { makeSignUpController } from "@/main/factories/controllers/User/SignUp/SignUpControllerFactory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeSignUpController()));
    router.post("/login", adaptRoute(makeLoginController()));
};
