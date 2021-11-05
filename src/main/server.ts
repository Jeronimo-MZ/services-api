import "dotenv/config";

import { MongoHelper } from "@/infra/database/mongodb";
import { pinoLogger } from "@/main/adapters";

import { app } from "./config/app";
import { env } from "./config/env";
import { setupLogger } from "./config/logger";
import { setupRoutes } from "./config/routes";

enum ExitStatus {
    Failure = 1,
    Success = 0,
}

const PORT = process.env.PORT || 3333;
const exitSignals: NodeJS.Signals[] = ["SIGINT", "SIGTERM", "SIGQUIT"];

setupLogger(app);
setupRoutes(app);

(async () => {
    try {
        await MongoHelper.connect(env.mongoUrl).then(() => {
            pinoLogger.info("Connected to MongoDb");
        });
        const currentApp = app.listen(PORT, () =>
            pinoLogger.info(`server started on port: ${PORT}`),
        );

        for (const exitSignal of exitSignals) {
            process.on(exitSignal, async () => {
                try {
                    await MongoHelper.disconnect();
                    await new Promise((resolve, reject) => {
                        currentApp.close(error => {
                            if (error) reject(error);
                            resolve(true);
                        });
                    });
                    pinoLogger.info("App exited with success");
                    process.exit(ExitStatus.Success);
                } catch (error) {
                    pinoLogger.error(`App exited with error: ${error}`);
                    process.exit(ExitStatus.Failure);
                }
            });
        }
    } catch (error) {
        pinoLogger.error(`App exited with error: ${error}`);
        process.exit(ExitStatus.Failure);
    }
})();
