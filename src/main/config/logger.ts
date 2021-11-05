import { Express } from "express";
import expressPino from "express-pino-logger";

import { pinoLogger } from "@/main/adapters";

export const setupLogger = (app: Express): void => {
    app.use(
        expressPino({
            logger: pinoLogger,
        }),
    );
};
