import express, { Express } from "express";

import { env } from "./env";

export const setupStaticFiles = (app: Express): void => {
    app.use("/files", express.static(env.staticFilesPath));
};
