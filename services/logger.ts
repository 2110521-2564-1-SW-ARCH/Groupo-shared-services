import dayjs from "dayjs";

import {ApplicationLogMessage, SerializedApplicationLogMessage} from "../grpc/logging";

export class ApplicationLogger {
    private _service: string = "";
    private _traceID: string = "";
    private _message: string = "";
    private _fields: Record<string, string> = {};

    service(s: string) {
        this._service = s;
    }

    traceID(s: string): ApplicationLogger {
        const l = this.clone();
        l._traceID = s;
        return l;
    }

    set(k: string, v: string): ApplicationLogger {
        const l = this.clone();
        l._fields[k] = v;
        return l;
    }

    message(s: string): ApplicationLogger {
        const l = this.clone();
        l._message = s;
        return l;
    }

    proto(): ApplicationLogMessage {
        return {
            timestamp: dayjs().unix(),
            service: this._service,
            traceID: this._traceID,
            message: this._message,
            fields: this._fields,
        }
    }

    clone(): ApplicationLogger {
        const l = new ApplicationLogger();
        l._service = this._service;
        l._traceID = this._traceID;
        l._fields = {...this._fields};
        return l;
    }
}

export const logger = new ApplicationLogger();

export const registerApplicationLogger = (service: string) => {
    logger.service(service);
}

export const handler = (err: any, {msg}: SerializedApplicationLogMessage) => {
    if (err) {
        console.log(err);
    } else {
        console.log(msg);
    }
}
