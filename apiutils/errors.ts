import {getReasonPhrase, StatusCodes} from "http-status-codes";
import express from "express";
import {APIResponse, json} from "./messages";
import {logger, handler as grpcHandler} from "../services/logger";
import {LoggingGrpcClient} from "../grpc/client";
import {EntityNotFoundError} from "typeorm";

export class BaseAPIError extends Error {
    code: number;

    constructor(code: number, message?: string) {
        super();
        this.code = code;
        if (message) {
            this.message = message;
        } else {
            this.message = getReasonPhrase(code);
        }
    }

    response(): APIResponse<string> {
        return {
            status: this.code,
            body: this.message,
        };
    }
}

export class InternalServerError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class UnauthorizedError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class NotFoundError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}

export const handler: express.ErrorRequestHandler = (err: any, req: express.Request, res: express.Response, next) => {
    switch (true) {
        case err instanceof BaseAPIError:
            LoggingGrpcClient.Error(logger.set("error", err.message).message("API error").proto(), grpcHandler);
            json(res, err.response());
            break;
        case err instanceof EntityNotFoundError:
            LoggingGrpcClient.Error(logger.set("error", err.message).message("entity not found error").proto(), grpcHandler);
            json(res, new NotFoundError().response())
            break;
        default:
            LoggingGrpcClient.Error(logger.set("error", err.message).message("internal server error").proto(), grpcHandler);
            json(res, new InternalServerError().response());
    }
}

export const catcher = (handler: express.Handler): express.Handler => {
    return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        try {
            await handler(req, res, next);
        } catch (err) {
            next(err);
        }
    };
}
