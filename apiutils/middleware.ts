import {LoggingGrpcClient} from "../grpc/client";
import {logger, handler as grpcHandler, ApplicationLogger} from "../services/logger";
import express from "express";
import {performance} from "perf_hooks";

export const prepareLogger = (req: express.Request, res: express.Response): ApplicationLogger => {
    return logger
        .set("METHOD", req.method)
        .set("PATH", req.url)
        .set("STATUS", res.statusCode.toString())
        .set("CPU_TIME", `${performance.now() - req.body.startTime}ms`)
}

export const prepareHttpLogger: express.RequestHandler =  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    req.body = {...req.body, startTime: performance.now()}
    LoggingGrpcClient.Info(prepareLogger(req, res).message("http request success").proto(), grpcHandler);
}

export const httpLogger: express.RequestHandler = (req: express.Request, res: express.Response) => {
    LoggingGrpcClient.Info(prepareLogger(req, res).message("http request success").proto(), grpcHandler);
}
