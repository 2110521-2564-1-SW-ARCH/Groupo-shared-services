import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../apiutils/errors";
import express from "express";
/**
 * AccessTokenExpiredError is an error that indicate the provided access token is expired
 * frontend must provide refresh token to get a new access token
 */
export declare class AccessTokenExpiredError extends UnauthorizedError {
    constructor();
}
/**
 * TokenType is use to indicate which type of the token is provided
 */
export declare type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN";
/**
 * Token is the payload of JWT token
 */
export interface Token extends JwtPayload {
    /**
     * type of token `ACCESS_TOKEN` or `REFRESH_TOKEN`
     */
    type: TokenType;
    /**
     * an email of token associated user
     */
    email: string;
}
/**
 * generate an access token from an email
 * @param email of the user
 */
export declare const generateAccessToken: (email: string) => string;
/**
 * generate a refresh token from an email
 * @param email of the user
 */
export declare const generateRefreshToken: (email: string) => string;
/**
 * decode a encoded token.
 * if the token is expired, it will throw `AccessTokenExpiredError`.
 * if there is an unexpected error, it will throw normally.
 * @param token is a jwt token
 */
export declare const verifyToken: (token: string) => Token;
/**
 * check if the provided token is a bearer token, otherwise throw `UnauthorizedError`
 * @param token bearer token (starts with `Bearer `)
 */
export declare const verifyBearerToken: (token: string) => string;
/**
 * get an authorization from request header
 * @param req express request header
 */
export declare const getAuthorizationHeader: (req: express.Request) => string;
