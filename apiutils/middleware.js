"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = exports.prepareHttpLogger = exports.prepareLogger = void 0;
const client_1 = require("../grpc/client");
const logger_1 = require("../services/logger");
const perf_hooks_1 = require("perf_hooks");
const prepareLogger = (req, res) => {
    return logger_1.logger
        .set("METHOD", req.method)
        .set("PATH", req.url)
        .set("STATUS", res.statusCode.toString())
        .set("CPU_TIME", `${(perf_hooks_1.performance.now() - req.body.startTime).toFixed(3)}ms`);
};
exports.prepareLogger = prepareLogger;
const prepareHttpLogger = (req, res, next) => {
    req.body = Object.assign(Object.assign({}, req.body), { startTime: perf_hooks_1.performance.now() });
    client_1.LoggingGrpcClient.Info((0, exports.prepareLogger)(req, res).message("http request success").proto(), logger_1.handler);
};
exports.prepareHttpLogger = prepareHttpLogger;
const httpLogger = (req, res) => {
    client_1.LoggingGrpcClient.Info((0, exports.prepareLogger)(req, res).message("http request success").proto(), logger_1.handler);
};
exports.httpLogger = httpLogger;
//# sourceMappingURL=middleware.js.map