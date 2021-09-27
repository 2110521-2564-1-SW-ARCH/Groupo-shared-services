import {createConnection} from "typeorm";
import {handler as grpcHandler, logger as lg} from "../services/logger";
import {LoggingGrpcClient} from "../grpc/client";

export const initMySQLConnection = (modelPath: string) => {
    const logger = lg.set("host", process.env.MYSQL_HOST).set("user", process.env.MYSQL_USER);

    LoggingGrpcClient.Info(logger.message("initiate mysql connection").proto(), grpcHandler);

    createConnection({
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
        LoggingGrpcClient.Info(logger.message("connect to mysql successfully").proto(), grpcHandler)
    }).catch(err => {
        LoggingGrpcClient.Info(logger.set("error", err).message("cannot connect to mysql").proto(), grpcHandler)
    })
}
