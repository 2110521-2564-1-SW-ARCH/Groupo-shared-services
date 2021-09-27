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

export const loggingDescription: any = grpc.loadPackageDefinition(loggingDefinition).logging as unknown as GrpcObject;
