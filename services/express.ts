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
 * @param requiredAuth is required authentication
 */
export const getExpressRequestContext = <T>(req: express.Request, requiredAuth: boolean = true): ExpressRequestCtx<T> => {
    let email;

    if (requiredAuth) {
        email = verifyToken(verifyBearerToken(getAuthorizationHeader(req))).email;
    } else {
        try {
            email = verifyToken(verifyBearerToken(getAuthorizationHeader(req))).email;
        } catch (err) {
            email = "anonymous";
        }
    }
    return {email, logger: logger.set("email", email), body: req.body as T};
};
