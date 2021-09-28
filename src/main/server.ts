import "module-alias/register";

import { MongoHelper } from "@/infra/database/mongodb/helpers";

import { app } from "./config/app";
import { setupMiddlewares } from "./config/middlewares";
import { setupRoutes } from "./config/routes";

const PORT = process.env.PORT || 3333;

setupMiddlewares(app);
setupRoutes(app);

MongoHelper.connect(
    process.env.MONGO_URL || "mongodb://localhost:27017/services-api",
)
    .then(() => {
        console.log("Connected to MongoDb");
        app.listen(PORT, () => console.log("server started on port:", PORT));
    })
    .catch(console.error);
