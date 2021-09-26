import dayjs from "dayjs";

const colors = {
    reset: "\x1b[0m",

    // colors
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
};

type LogLevel = "INFO" | "DEBUG" | "WARN" | "ERROR";

export class ApplicationLogger {
    private _service: string = "";
    private _traceID: string = "";
    private _fields: Record<string, string> = {};

    private logString: string = "";

    service(s: string) {
        this._service = s;
    }

    traceID(s: string): ApplicationLogger {
        const l = this.clone();
        l._traceID = s;
        return l;
    }

    field(key: string, value: string): ApplicationLogger {
        const l = this.clone();
        l._fields[key] = value;
        return l;
    }

    private initLogString(s: string, color?: string) {
        if (color) {
            this.logString = `${color}${s}${colors.reset}`;
        } else {
            this.logString = s;
        }
    }

    private appendLogString(s: string, color?: string) {
        if (color) {
            this.logString += ` ${color}${s}${colors.reset}`;
        } else {
            this.logString += ` ${s}`;
        }
    }

    info(s: string) {
        this.message(s, "INFO");
    }

    debug(s: string) {
        this.message(s, "DEBUG");
    }

    warn(s: string) {
        this.message(s, "WARN");
    }

    error(s: string) {
        this.message(s, "ERROR");
    }

    message(s: string, level: LogLevel) {
        const d = dayjs();

        this.initLogString(d.format("YYYY-MM-DD HH:mm:ss"));
        this.appendLogString(`[${this._service}]`)

        switch (level) {
            case "INFO":
                this.appendLogString("[INFO]", colors.green);
                break;
            case "DEBUG":
                this.appendLogString("[DEBUG]", colors.blue);
                break;
            case "WARN":
                this.appendLogString("[WARN]", colors.yellow);
                break;
            case "ERROR":
                this.appendLogString("[ERROR]", colors.red);
                break;
        }

        if (s) {
            this.appendLogString(s)
        }

        for (const k of Object.keys(this._fields)) {
            this.appendLogString(`  ${colors.cyan}${k}${colors.reset}=${colors.cyan}${this._fields[k]}${colors.reset}`);
        }


        console.log(this.logString);
    }

    clone(): ApplicationLogger {
        const l = new ApplicationLogger();
        l.traceID = this.traceID;
        l._fields = {...this._fields};
        return l;
    }
}

export const logger = new ApplicationLogger();

export const registerApplicationLogger = (service: string) => {
    logger.service(service);
}
