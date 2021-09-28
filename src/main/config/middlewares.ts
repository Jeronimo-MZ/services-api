import { Express } from "express";

import { bodyParser } from "@/main/middlewares";

export const setupMiddlewares = (app: Express): void => {
    app.use(bodyParser);
};
