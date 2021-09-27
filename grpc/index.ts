import * as grpc from "@grpc/grpc-js";
import * as loader from "@grpc/proto-loader";
import {GrpcObject} from "@grpc/grpc-js";
import {ApplicationLogMessage} from "./logging";

const loggingDefinition = loader.loadSync(
    __dirname + "/logging.proto",
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true,
    }
);

const successApplicationLogMessage: ApplicationLogMessage = {
    traceID: "",
    message: "Connect to GRPC Server successfully",
    service: "common-service",
    timestamp: 0,
    customFields: {},
}

export const loggingDescription: any = grpc.loadPackageDefinition(loggingDefinition).logging as unknown as GrpcObject;
export const LoggingGrpcClient = new loggingDescription.ApplicationLogService(process.env.GRPC_SERVER_HOST, grpc.credentials.createInsecure())

LoggingGrpcClient.Info(successApplicationLogMessage)