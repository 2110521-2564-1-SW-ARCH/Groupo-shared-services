export interface ApplicationLogMessage {
    // unix timestamp
    timestamp: number;

    // source of the service
    service: string;

    // trace ID for tracking request
    traceID: string;

    // log message
    message: string;

    // custom fields
    fields: Record<string, string>;
}

export interface SerializedApplicationLogMessage {
    // console log message
    msg: string;
}
