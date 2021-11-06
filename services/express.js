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
 */
const getExpressRequestContext = (req) => {
    const bearer = (0, exports.getAuthorizationHeader)(req);
    const token = (0, authentication_1.verifyBearerToken)(bearer);
    const email = (0, authentication_1.verifyToken)(token).email;
    const expressLogger = logger_1.logger.set("email", email);
    return { email, logger: expressLogger };
};
exports.getExpressRequestContext = getExpressRequestContext;
//# sourceMappingURL=express.js.map