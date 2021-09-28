import { Express, Router } from "express";
import { readdirSync } from "fs";

export const setupRoutes = (app: Express): void => {
    const router = Router();
    app.use("/api", router);

    readdirSync(`${__dirname}/../routes`).map(async file => {
        if (!file.includes(".test.") && !file.endsWith(".map")) {
            (await import(`../routes/${file}`)).default(router);
        }
    });
};
