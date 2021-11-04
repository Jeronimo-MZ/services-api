import request from "supertest";

import { app } from "@/main/config/app";

describe("body parser middleware", () => {
    it("should parse body as json", async () => {
        app.post("/test_body_parser", (request, response) => {
            return response.send(request.body);
        });
        const data = {
            name: "Jerónimo",
        };

        await request(app).post("/test_body_parser").send(data).expect(data);
    });
});
