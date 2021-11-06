"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExpressRequestContext = exports.getAuthorizationHeader = void 0;
const authentication_1 = require("./authentication");
const logger_1 = require("./logger");
/**
 * get an authorization from express request header
 * @param req express request header
 */
const getAuthorizationHeader = (req) => {
    return req.header("Authorization");
};
exports.getAuthorizationHeader = getAuthorizationHeader;
/**
 * get express context
 * @param req express request context
 * @param requiredAuth is required authentication
 */
const getExpressRequestContext = (req, requiredAuth = true) => {
    let email;
    if (requiredAuth) {
        email = (0, authentication_1.verifyToken)((0, authentication_1.verifyBearerToken)((0, exports.getAuthorizationHeader)(req))).email;
    }
    else {
        try {
            email = (0, authentication_1.verifyToken)((0, authentication_1.verifyBearerToken)((0, exports.getAuthorizationHeader)(req))).email;
        }
        catch (err) {
            email = "anonymous";
        }
    }
    return { email, logger: logger_1.logger.set("email", email), body: req.body };
};
exports.getExpressRequestContext = getExpressRequestContext;
//# sourceMappingURL=express.js.map