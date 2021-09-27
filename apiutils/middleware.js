"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.prepareLogger = void 0;
const client_1 = require("../grpc/client");
const logger_1 = require("../services/logger");
const prepareLogger = (req, res) => {
    return logger_1.logger.set("method", req.method).set("path", req.url).set("status", res.statusCode.toString());
};
exports.prepareLogger = prepareLogger;
const httpLogger = (req, res, next) => {
    client_1.LoggingGrpcClient.Info((0, exports.prepareLogger)(req, res).message("http call return").proto(), logger_1.handler);
    next();
};
exports.httpLogger = httpLogger;
//# sourceMappingURL=middleware.js.map