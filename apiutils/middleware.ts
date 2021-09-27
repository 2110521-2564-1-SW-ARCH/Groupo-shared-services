import {LoggingGrpcClient} from "../grpc/client";
import {logger} from "../services/logger";
import express from "express";

export const httpLogMiddleware: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req);
}