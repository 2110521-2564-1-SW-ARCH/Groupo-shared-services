"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationLogger = void 0;
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
class ApplicationLogger {
    constructor() {
        this.traceID = "";
        this.fields = {};
        this.logString = "";
    }
    field(key, value) {
        const l = this.clone();
        l.fields[key] = value;
        return l;
    }
    initLogString(s, color) {
        if (color) {
            this.logString = `${color}${s}${colors.reset}`;
        }
        else {
            this.logString = s;
        }
    }
    appendLogString(s, color) {
        if (color) {
            this.logString += ` ${color}${s}${colors.reset}`;
        }
        else {
            this.logString += ` ${s}`;
        }
    }
    info(s) {
        this.message(s, "INFO");
    }
    debug(s) {
        this.message(s, "DEBUG");
    }
    warn(s) {
        this.message(s, "WARN");
    }
    error(s) {
        this.message(s, "ERROR");
    }
    message(s, level) {
        const t = new Date();
        this.initLogString(t.toLocaleDateString());
        switch (level) {
            case "INFO":
                this.appendLogString("INFO", colors.green);
                break;
            case "DEBUG":
                this.appendLogString("INFO", colors.blue);
                break;
            case "WARN":
                this.appendLogString("INFO", colors.yellow);
                break;
            case "ERROR":
                this.appendLogString("INFO", colors.red);
                break;
        }
        if (s) {
            this.appendLogString(s);
        }
        for (const k of Object.keys(this.fields)) {
            this.appendLogString(`\t${k}=${this.fields[k]}`);
        }
        console.log(this.logString);
    }
    clone() {
        const l = new ApplicationLogger();
        l.traceID = this.traceID;
        l.fields = Object.assign({}, l.fields);
        return l;
    }
}
exports.ApplicationLogger = ApplicationLogger;
//# sourceMappingURL=logger.js.map