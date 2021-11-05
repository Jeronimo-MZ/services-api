import "dotenv/config";

import { MongoHelper } from "@/infra/database/mongodb";
import { pinoLogger } from "@/main/adapters";

import { app } from "./config/app";
import { env } from "./config/env";
import { setupLogger } from "./config/logger";
import { setupRoutes } from "./config/routes";

enum ExitStatus {
    Failure = 1,
}

const PORT = process.env.PORT || 3333;

setupLogger(app);
setupRoutes(app);

(async () => {
    try {
        await MongoHelper.connect(env.mongoUrl).then(() => {
            pinoLogger.info("Connected to MongoDb");
            app.listen(PORT, () =>
                pinoLogger.info(`server started on port: ${PORT}`),
            );
        });
    } catch (error) {
        pinoLogger.error(`App exited with error: ${error}`);
        process.exit(ExitStatus.Failure);
    }
})();
