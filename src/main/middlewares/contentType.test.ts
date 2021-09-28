import request from "supertest";

import { app } from "@/main/config/app";

import { contentType } from "./contentType";

describe("Content Type Middleware", () => {
    it("should return default content type as json", async () => {
        app.get("/test_content_type", contentType, (_request, response) => {
            return response.send();
        });

        await request(app)
            .get("/test_content_type")
            .expect("content-type", /json/);
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
