import { Router } from "express";

import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeSignUpController } from "@/main/factories/controllers/User/SignUp/SignUpControllerFactory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeSignUpController()));
};
