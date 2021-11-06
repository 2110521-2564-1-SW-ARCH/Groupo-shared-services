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
 * @param requiredAuth is required authentication
 */
export declare const getExpressRequestContext: <T>(req: express.Request, requiredAuth?: boolean) => ExpressRequestCtx<T>;
