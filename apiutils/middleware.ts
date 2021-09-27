import {LoggingGrpcClient} from "../grpc/client";
import {logger, handler as grpcHandler, ApplicationLogger} from "../services/logger";
import express from "express";

export const prepareLogger = (req: express.Request, res: express.Response): ApplicationLogger => {
    return logger.set("method", req.method).set("path", req.url).set("status", res.statusCode.toString());
}

export const httpLogger: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    LoggingGrpcClient.Info(prepareLogger(req, res).message("http call return").proto(), grpcHandler);
    next();
}
