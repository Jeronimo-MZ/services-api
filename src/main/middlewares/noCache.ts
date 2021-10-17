import { NextFunction, Request, Response } from "express";

export const noCache = (
    _request: Request,
    response: Response,
    next: NextFunction,
): void => {
    response.set(
        "cache-control",
        "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.set("pragma", "no-cache");
    response.set("expires", "0");
    response.set("surrogate-control", "no-store");
    next();
};
