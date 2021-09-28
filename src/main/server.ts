import { app } from "./config/app";
import { setupMiddlewares } from "./config/middlewares";

const PORT = process.env.PORT || 3333;

setupMiddlewares(app);

app.listen(PORT, () => console.log("server started on port:", PORT));
