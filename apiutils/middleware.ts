import {LoggingGrpcClient} from "../grpc/client";
import {logger, handler as grpcHandler, ApplicationLogger} from "../services/logger";
import express from "express";
import {performance} from "perf_hooks";

export const prepareLogger = (req: express.Request, res: express.Response): ApplicationLogger => {
    return logger
        .set("method", req.method)
        .set("path", req.url)
        .set("status", res.statusCode.toString())
        .set("cpu time", `${performance.now() - req.body.startTime}ms`)
}

export const prepareHttpLogger: express.RequestHandler =  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.body = {...req.body, startTime: performance.now()}
    LoggingGrpcClient.Info(prepareLogger(req, res).message("http request success").proto(), grpcHandler);
}

export const httpLogger: express.RequestHandler = (req: express.Request, res: express.Response) => {
    LoggingGrpcClient.Info(prepareLogger(req, res).message("http request success").proto(), grpcHandler);
}
