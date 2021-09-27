"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.dump = void 0;
const client_1 = require("../grpc/client");
const logger_1 = require("../services/logger");
const dump = (req, res) => {
    return `${req.method} ${req.url}`;
};
exports.dump = dump;
const httpLogger = (req, res, next) => {
    client_1.LoggingGrpcClient.Info(logger_1.logger.message((0, exports.dump)(req, res)).proto(), logger_1.handler);
    next();
};
exports.httpLogger = httpLogger;
//# sourceMappingURL=middleware.js.map