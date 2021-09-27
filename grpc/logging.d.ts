export interface ApplicationLogMessage {
    timestamp: number;
    service: string;
    traceID: string;
    message: string;
    customFields: Record<string, string>;
}
