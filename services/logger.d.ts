import { ApplicationLogMessage, SerializedApplicationLogMessage } from "../grpc/logging";
export declare class ApplicationLogger {
    private _service;
    private _traceID;
    private _message;
    private _fields;
    service(s: string): void;
    traceID(s: string): ApplicationLogger;
    set(k: string, v: string): ApplicationLogger;
    message(s: string): ApplicationLogger;
    proto(): ApplicationLogMessage;
    clone(): ApplicationLogger;
}
export declare const logger: ApplicationLogger;
export declare const registerApplicationLogger: (service: string) => void;
export declare const handler: (err: any, { msg }: SerializedApplicationLogMessage) => void;
