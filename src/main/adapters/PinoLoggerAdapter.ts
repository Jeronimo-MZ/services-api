import Pino from "pino";

import { env } from "@/main/config/env";

export const pinoLogger = Pino({
    enabled: env.logger.enabled,
    level: env.logger.level,
});
