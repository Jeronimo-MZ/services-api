import { NextFunction, Request, Response } from "express";

import { Middleware } from "@/presentation/protocols";

export const adaptMiddleware = (middleware: Middleware) => {
    return async (
        request: Request,
        response: Response,
        next: NextFunction,
    ): Promise<any> => {
        const req = {
            accessToken: request.headers?.["x-access-token"],
            ...(request.headers || {}),
        };
        const httpResponse = await middleware.handle(req);
        if (httpResponse.statusCode === 200) {
            Object.assign(request.body, httpResponse.body);
            next();
        } else {
            response.status(httpResponse.statusCode).json({
                error: httpResponse.body.message,
            });
        }
    };
};
