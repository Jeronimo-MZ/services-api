import request from "supertest";

import { app } from "@/main/config/app";
import { cors } from "@/main/middlewares";

describe("CORS middleware", () => {
    it("should enable CORS", async () => {
        app.get("/test_cors", cors, (_request, response) => {
            return response.send();
        });

        await request(app)
            .get("/test_cors")
            .send()
            .expect("access-control-allow-origin", "*")
            .expect("access-control-allow-methods", "*")
            .expect("access-control-allow-headers", "*");
    });
});
