"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIOHandshakeQuery = exports.getAuthorizationHeader = exports.verifyBearerToken = exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = exports.AccessTokenExpiredError = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("../apiutils/errors");
/**
 * AccessTokenExpiredError is an error that indicate the provided access token is expired
 * frontend must provide refresh token to get a new access token
 */
class AccessTokenExpiredError extends errors_1.UnauthorizedError {
    constructor() {
        super("Access Token Expired");
    }
}
exports.AccessTokenExpiredError = AccessTokenExpiredError;
/**
 * generate an access token from an email
 * @param email of the user
 */
const generateAccessToken = (email) => {
    const payload = { email, type: "ACCESS_TOKEN" };
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
exports.generateAccessToken = generateAccessToken;
/**
 * generate a refresh token from an email
 * @param email of the user
 */
const generateRefreshToken = (email) => {
    const payload = { email, type: "REFRESH_TOKEN" };
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
};
exports.generateRefreshToken = generateRefreshToken;
/**
 * decode a encoded token.
 * if the token is expired, it will throw `AccessTokenExpiredError`.
 * if there is an unexpected error, it will throw normally.
 * @param token is a jwt token
 */
const verifyToken = (token) => {
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, process.env.JWT_SECRET);
        if (typeof decoded === "string") {
            return JSON.parse(decoded);
        }
        return decoded;
    }
    catch (e) {
        if (e.message === "jwt expired") {
            throw new AccessTokenExpiredError();
        }
        throw e;
    }
};
exports.verifyToken = verifyToken;
/**
 * check if the provided token is a bearer token, otherwise throw `UnauthorizedError`
 * @param token bearer token (starts with `Bearer `)
 */
const verifyBearerToken = (token) => {
    if (!token) {
        throw new errors_1.UnauthorizedError("token is not provided");
    }
    if (!token.startsWith("Bearer ")) {
        throw new errors_1.UnauthorizedError("token is not starts with `Bearer `");
    }
    return token.replace("Bearer ", "");
};
exports.verifyBearerToken = verifyBearerToken;
/**
 * get an authorization from request header
 * @param req express request header
 */
const getAuthorizationHeader = (req) => {
    return req.header("Authorization");
};
exports.getAuthorizationHeader = getAuthorizationHeader;
/**
 * get the handshake query when the socket connection is establish
 * @param socket connected socket instance
 */
const getSocketIOHandshakeQuery = (socket) => {
    return socket.handshake.query;
};
exports.getSocketIOHandshakeQuery = getSocketIOHandshakeQuery;
//# sourceMappingURL=authentication.js.map