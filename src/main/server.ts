import { app } from "./config/app";
import { setupMiddlewares } from "./config/middlewares";
import { setupRoutes } from "./config/routes";

const PORT = process.env.PORT || 3333;

setupMiddlewares(app);
setupRoutes(app);

app.listen(PORT, () => console.log("server started on port:", PORT));
