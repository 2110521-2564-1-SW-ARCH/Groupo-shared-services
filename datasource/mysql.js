"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMySQLConnection = void 0;
const typeorm_1 = require("typeorm");
const logger_1 = require("../services/logger");
const client_1 = require("../grpc/client");
const initMySQLConnection = (modelPath) => {
    const logger = logger_1.logger.set("MYSQL_HOST", process.env.MYSQL_HOST).set("MYSQL_USER", process.env.MYSQL_USER);
    client_1.LoggingGrpcClient.Info(logger.message("initiate mysql connection").proto(), logger_1.handler);
    (0, typeorm_1.createConnection)({
        type: "mysql",
        host: process.env.MYSQL_HOST,
        port: parseInt(process.env.MYSQL_PORT, 10) || 3306,
        username: process.env.MYSQL_USER || "root",
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DB,
        entities: [modelPath],
        synchronize: true,
        logging: false,
    }).then(() => {
        client_1.LoggingGrpcClient.Info(logger.message("connect to mysql successfully").proto(), logger_1.handler);
    }).catch(err => {
        client_1.LoggingGrpcClient.Info(logger.set("error", err).message("cannot connect to mysql").proto(), logger_1.handler);
    });
};
exports.initMySQLConnection = initMySQLConnection;
//# sourceMappingURL=mysql.js.map