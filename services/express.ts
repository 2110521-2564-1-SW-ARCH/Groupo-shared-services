import {ExpressRequestCtx} from "../types/express";
import express from "express";
import {verifyBearerToken, verifyToken} from "./authentication";
import {logger} from "./logger";

/**
 * get an authorization from express request header
 * @param req express request header
 */
export const getAuthorizationHeader = (req: express.Request): string => {
    return req.header("Authorization");
};


/**
 * get express context
 * @param req express request context
 */
export const getExpressRequestContext = (req: express.Request): ExpressRequestCtx => {
    const bearer = getAuthorizationHeader(req);
    const token = verifyBearerToken(bearer);
    const email = verifyToken(token).email;
    const expressLogger = logger.set("email", email);
    return {email, logger: expressLogger};
};
