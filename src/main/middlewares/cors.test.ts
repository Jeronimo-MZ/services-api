import request from "supertest";

import { app } from "@/main/config/app";

import { cors } from "./cors";

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

    it("should return xml content type when forced", async () => {
        app.get("/test_content_type_xml", (_request, response) => {
            response.type("xml");
            return response.send();
        });

        await request(app)
            .get("/test_content_type_xml")
            .expect("content-type", /xml/);
    });
});
