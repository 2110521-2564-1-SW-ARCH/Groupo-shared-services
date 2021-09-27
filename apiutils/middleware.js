"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.prepareHttpLogger = exports.prepareLogger = void 0;
const client_1 = require("../grpc/client");
const logger_1 = require("../services/logger");
const prepareLogger = (req, res) => {
    return logger_1.logger
        .set("method", req.method)
        .set("path", req.url)
        .set("status", res.statusCode.toString())
        .set("cpu time", `${performance.now() - req.body.startTime}ms`);
};
exports.prepareLogger = prepareLogger;
const prepareHttpLogger = (req, res, next) => {
    req.body = Object.assign(Object.assign({}, req.body), { startTime: performance.now() });
    client_1.LoggingGrpcClient.Info((0, exports.prepareLogger)(req, res).message("http request success").proto(), logger_1.handler);
};
exports.prepareHttpLogger = prepareHttpLogger;
const httpLogger = (req, res) => {
    client_1.LoggingGrpcClient.Info((0, exports.prepareLogger)(req, res).message("http request success").proto(), logger_1.handler);
};
exports.httpLogger = httpLogger;
//# sourceMappingURL=middleware.js.map