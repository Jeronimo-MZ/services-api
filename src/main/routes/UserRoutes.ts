import { Router } from "express";

import { adaptRoute } from "@/main/adapters/ExpressRouteAdapter";
import { makeLoginController } from "@/main/factories/controllers/User/Login/LoginControllerFactory";
import { makeShowUserController } from "@/main/factories/controllers/User/ShowUser/ShowUserControllerFactory";
import { makeSignUpController } from "@/main/factories/controllers/User/SignUp/SignUpControllerFactory";

import { adaptMiddleware } from "../adapters/ExpressMiddlewareAdapter";
import { adaptMulter } from "../adapters/MulterAdapter";
import { makeUpdateUserAvatarController } from "../factories/controllers/User/UpdateUserAvatar/UpdateUserAvatarControllerFactory";
import { makeAuthMiddleware } from "../factories/middlewares/AuthMiddlewareFactory";

export default (router: Router): void => {
    router.post("/signup", adaptRoute(makeSignUpController()));
    router.post("/login", adaptRoute(makeLoginController()));
    router.get("/users/me", adaptRoute(makeShowUserController()));
    router.patch(
        "/users/avatar",
        adaptMulter,
        adaptMiddleware(makeAuthMiddleware()),
        adaptRoute(makeUpdateUserAvatarController()),
    );
};
