import {JwtPayload, sign, verify} from "jsonwebtoken";
import {UnauthorizedError} from "../apiutils/errors";
import express from "express";
import {Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";

/**
 * HandshakeQuery is set of query parameters that provided
 */
export interface SocketIOHandshakeQuery {
    /**
     * boardID is used to be a roomID of socket io architecture
     */
    boardID: string;
    /**
     * jwt token of the user that connect to socket
     */
    token: string;
}


/**
 * AccessTokenExpiredError is an error that indicate the provided access token is expired
 * frontend must provide refresh token to get a new access token
 */
export class AccessTokenExpiredError extends UnauthorizedError {
    constructor() {
        super("Access Token Expired");
    }
}

/**
 * TokenType is use to indicate which type of the token is provided
 */
export type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN";

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
export const generateAccessToken = (email: string): string => {
    const payload: Token = {email, type: "ACCESS_TOKEN"};
    return sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
};

/**
 * generate a refresh token from an email
 * @param email of the user
 */
export const generateRefreshToken = (email: string): string => {
    const payload: Token = {email, type: "REFRESH_TOKEN"};
    return sign(payload, process.env.JWT_SECRET);
};

/**
 * decode a encoded token.
 * if the token is expired, it will throw `AccessTokenExpiredError`.
 * if there is an unexpected error, it will throw normally.
 * @param token is a jwt token
 */
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

/**
 * check if the provided token is a bearer token, otherwise throw `UnauthorizedError`
 * @param token bearer token (starts with `Bearer `)
 */
export const verifyBearerToken = (token: string): string => {
    if (!token) {
        throw new UnauthorizedError("token is not provided");
    }

    if (!token.startsWith("Bearer ")) {
        throw new UnauthorizedError("token is not starts with `Bearer `");
    }

    return token.replace("Bearer ", "");
};

/**
 * get an authorization from request header
 * @param req express request header
 */
export const getAuthorizationHeader = (req: express.Request): string => {
    return req.header("Authorization");
};

/**
 * get the handshake query when the socket connection is establish
 * @param socket connected socket instance
 */
export const getHandshakeQuery = (socket: Socket<DefaultEventsMap, DefaultEventsMap>): SocketIOHandshakeQuery => {
    return socket.handshake.query as any as SocketIOHandshakeQuery;
};
