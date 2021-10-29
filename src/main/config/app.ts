import express from "express";

import { setupMiddlewares } from "./middlewares";
import { setupStaticFiles } from "./staticFiles";
import { setupSwagger } from "./swagger";

const app = express();

setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);

export { app };
