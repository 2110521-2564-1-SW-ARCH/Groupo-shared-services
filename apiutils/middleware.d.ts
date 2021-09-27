import { ApplicationLogger } from "../services/logger";
import express from "express";
export declare const prepareLogger: (req: express.Request, res: express.Response) => ApplicationLogger;
export declare const initHttpLogger: express.RequestHandler;
export declare const httpLogger: express.RequestHandler;
