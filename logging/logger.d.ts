declare type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR";
export declare class ApplicationLogger {
    private traceID;
    private fields;
    private logString;
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
export {};
