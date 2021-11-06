import {JwtPayload, sign, verify} from "jsonwebtoken";
import {UnauthorizedError} from "../apiutils/errors";
import express from "express";

export class AccessTokenExpiredError extends UnauthorizedError {
    constructor() {
        super("Access Token Expired");
    }
}

export type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export interface Token extends JwtPayload {
    type: TokenType;
    email: string;
}

export const generateAccessToken = (email: string): string => {
    const payload: Token = {email, type: "ACCESS_TOKEN"};
    return sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
};

export const generateRefreshToken = (email: string): string => {
    const payload: Token = {email, type: "REFRESH_TOKEN"};
    return sign(payload, process.env.JWT_SECRET);
};

export const verifyToken = (token: string): Token => {
    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        if (typeof decoded === "string") {
            return JSON.parse(decoded);
        }
        return decoded as Token;
    } catch (e) {
        if (e.message === "jwt expired") {
            throw new AccessTokenExpiredError();
        }
        throw e;
    }
};

export const verifyBearerToken = (token: string): string => {
    if (!token) {
        throw new UnauthorizedError("token is not provided");
    }

    if (!token.startsWith("Bearer ")) {
        throw new UnauthorizedError("token is not starts with `Bearer `");
    }

    return token.replace("Bearer ", "");
};

export const getAuthorizationHeader = (req: express.Request): string => {
    return req.header("Authorization");
};
