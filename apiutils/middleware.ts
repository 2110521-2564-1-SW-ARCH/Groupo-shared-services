import {LoggingGrpcClient} from "../grpc/client";
import {logger, handler as grpcHandler} from "../services/logger";
import express from "express";

export const dump = (req: express.Request, res: express.Response): string => {
    return `${req.method} ${req.url}`;
}

export const httpLogger: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    LoggingGrpcClient.Info(logger.message(dump(req, res)).proto(), grpcHandler);
    next();
}
