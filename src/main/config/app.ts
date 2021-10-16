import express from "express";

import { setupMiddlewares } from "./middlewares";
import { setupSwagger } from "./swagger";

const app = express();

setupSwagger(app);
setupMiddlewares(app);

export { app };
