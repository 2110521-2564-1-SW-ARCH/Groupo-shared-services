import {LoggingGrpcClient} from "../grpc/client";
import {logger} from "../services/logger";
import express from "express";

export const httpLogger: express.RequestHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(req);
    console.log(req.url);
    console.log(req.params);
    console.log(req.header);
    console.log(req.body);
}