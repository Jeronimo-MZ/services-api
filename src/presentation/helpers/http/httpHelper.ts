import { ServerError, UnauthorizedError } from "@/presentation/errors";
import { HttpResponse } from "@/presentation/protocols";

export const ok = (data: unknown): HttpResponse => ({
    statusCode: 200,
    body: data,
});

export const badRequest = (error: Error): HttpResponse => ({
    statusCode: 400,
    body: error,
});

export const unauthorized = (): HttpResponse => ({
    statusCode: 401,
    body: new UnauthorizedError(),
});

export const forbidden = (error: Error): HttpResponse => ({
    statusCode: 403,
    body: error,
});

export const serverError = (error: Error): HttpResponse => ({
    statusCode: 500,
    body: new ServerError(error.stack),
});
