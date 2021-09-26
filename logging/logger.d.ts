declare type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR";
export declare class ApplicationLogger {
    private _service;
    private _traceID;
    private _fields;
    private logString;
    service(s: string): void;
    traceID(s: string): ApplicationLogger;
    field(key: string, value: string): ApplicationLogger;
    private initLogString;
    private appendLogString;
    info(s: string): void;
    debug(s: string): void;
    warn(s: string): void;
    error(s: string): void;
    message(s: string, level: LogLevel): void;
    clone(): ApplicationLogger;
}
export declare const logger: ApplicationLogger;
export declare const registerApplicationLogger: (service: string) => void;
export {};
