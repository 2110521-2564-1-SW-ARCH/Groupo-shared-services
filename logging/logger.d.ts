export declare class ApplicationLogger {
    private level;
    private traceID;
    private _message;
    private fields;
    private logString;
    static Info(traceID: string): ApplicationLogger;
    static Debug(traceID: string): ApplicationLogger;
    static Warn(traceID: string): ApplicationLogger;
    static Error(traceID: string): ApplicationLogger;
    message(s: string): ApplicationLogger;
    field(key: string, value: string): ApplicationLogger;
    private clearLogString;
    private appendLogString;
    log(): void;
    clone(): ApplicationLogger;
}
