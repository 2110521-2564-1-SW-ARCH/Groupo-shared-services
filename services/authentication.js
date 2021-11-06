"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAuthorizationHeader = exports.verifyBearerToken = exports.verifyToken = exports.generateRefreshToken = exports.generateAccessToken = exports.AccessTokenExpiredError = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const errors_1 = require("../apiutils/errors");
class AccessTokenExpiredError extends errors_1.UnauthorizedError {
    constructor() {
        super("Access Token Expired");
    }
}
exports.AccessTokenExpiredError = AccessTokenExpiredError;
const generateAccessToken = (email) => {
    const payload = { email, type: "ACCESS_TOKEN" };
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (email) => {
    const payload = { email, type: "REFRESH_TOKEN" };
    return (0, jsonwebtoken_1.sign)(payload, process.env.JWT_SECRET);
};
exports.generateRefreshToken = generateRefreshToken;
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
const getAuthorizationHeader = (req) => {
    return req.header("Authorization");
};
exports.getAuthorizationHeader = getAuthorizationHeader;
//# sourceMappingURL=authentication.js.map