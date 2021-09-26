"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initMySQLConnection = void 0;
const typeorm_1 = require("typeorm");
const logger_1 = require("../logging/logger");
(0, logger_1.registerApplicationLogger)("common-service");
const initMySQLConnection = (modelPath) => {
    const lg = logger_1.logger.field("host", process.env.MYSQL_HOST).field("user", process.env.MYSQL_USER);
    lg.info("initiate mysql connection...");
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
        lg.info("connect to mysql successfully");
    }).catch(err => {
        lg.error("cannot connect to mysql");
    });
};
exports.initMySQLConnection = initMySQLConnection;
//# sourceMappingURL=mysql.js.map