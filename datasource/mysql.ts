import {createConnection} from "typeorm";
import {logger, registerApplicationLogger} from "../logging/logger";

registerApplicationLogger("common-service")

export const initMySQLConnection = (modelPath: string) => {
    const lg = logger.field("host", process.env.MYSQL_HOST).field("user", process.env.MYSQL_USER);
    lg.info("initiate mysql connection...");
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
        lg.info("connect to mysql successfully");
    }).catch(err => {
        lg.error("cannot connect to mysql");
    })
}
