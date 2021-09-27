import * as grpc from "@grpc/grpc-js";
import {loggingDescription} from "./index";

export const LoggingGrpcClient = new loggingDescription.ApplicationLogService(process.env.GRPC_SERVER_HOST, grpc.credentials.createInsecure())
