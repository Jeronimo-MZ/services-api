import { RequestHandler } from "express";
import multer from "multer";

import { ServerError } from "@/presentation/errors";

export const adaptMulter: RequestHandler = (req, res, next) => {
    const upload = multer().single("avatar");
    upload(req, res, error => {
        if (error) {
            return res
                .status(500)
                .json({ error: new ServerError(error).message });
        }
        next();
    });
};
