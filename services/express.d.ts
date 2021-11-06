import { ExpressRequestCtx } from "../types/express";
import express from "express";
/**
 * get an authorization from express request header
 * @param req express request header
 */
export declare const getAuthorizationHeader: (req: express.Request) => string;
/**
 * get express context
 * @param req express request context
 */
export declare const getExpressRequestContext: (req: express.Request) => ExpressRequestCtx;
