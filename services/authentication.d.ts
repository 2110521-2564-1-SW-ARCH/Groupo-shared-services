import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../apiutils/errors";
import express from "express";
import { IncomingHttpHeaders } from "http";
export declare class AccessTokenExpiredError extends UnauthorizedError {
    constructor();
}
export declare type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN";
export interface Token extends JwtPayload {
    type: TokenType;
    email: string;
}
export declare const generateAccessToken: (email: string) => string;
export declare const generateRefreshToken: (email: string) => string;
export declare const verifyToken: (token: string) => Token;
export declare const verifyAuthorization: (authorization: string) => Token;
export declare const verifyAuthorizationIncomingHeaders: (header: IncomingHttpHeaders) => Token;
export declare const verifyAuthorizationHeader: (req: express.Request) => Token;
