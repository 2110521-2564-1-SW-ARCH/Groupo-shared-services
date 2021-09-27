export interface ApplicationLogMessage {
    timestamp: number;
    service: string;
    traceID: string;
    message: string;
    fields: Record<string, string>;
}
export interface SerializedApplicationLogMessage {
    msg: string;
}
