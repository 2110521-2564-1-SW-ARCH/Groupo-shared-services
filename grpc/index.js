"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingGrpcClient = exports.loggingDescription = void 0;
const grpc = __importStar(require("@grpc/grpc-js"));
const loader = __importStar(require("@grpc/proto-loader"));
const loggingDefinition = loader.loadSync(__dirname + "/logging.proto", {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const successApplicationLogMessage = {
    traceID: "",
    message: "Connect to GRPC Server successfully",
    service: "common-service",
    timestamp: 0,
    customFields: {},
};
exports.loggingDescription = grpc.loadPackageDefinition(loggingDefinition).logging;
exports.LoggingGrpcClient = new exports.loggingDescription.ApplicationLogService(process.env.GRPC_SERVER_HOST, grpc.credentials.createInsecure());
exports.LoggingGrpcClient.Info(successApplicationLogMessage);
//# sourceMappingURL=index.js.map