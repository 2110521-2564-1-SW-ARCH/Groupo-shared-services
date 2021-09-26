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
        this.level = "INFO";
        this.traceID = "";
        this._message = "";
        this.fields = {};
        this.logString = "";
    }
    static Info(traceID) {
        const l = new ApplicationLogger();
        l.level = "INFO";
        l.traceID = traceID;
        return l;
    }
    static Debug(traceID) {
        const l = new ApplicationLogger();
        l.level = "DEBUG";
        l.traceID = traceID;
        return l;
    }
    static Warn(traceID) {
        const l = new ApplicationLogger();
        l.level = "WARN";
        l.traceID = traceID;
        return l;
    }
    static Error(traceID) {
        const l = new ApplicationLogger();
        l.level = "ERROR";
        l.traceID = traceID;
        return l;
    }
    message(s) {
        const l = this.clone();
        l._message = s;
        return this;
    }
    field(key, value) {
        const l = this.clone();
        l.fields[key] = value;
        return l;
    }
    clearLogString(s, color) {
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
    log() {
        const t = new Date();
        this.clearLogString(t.toLocaleDateString());
        switch (this.level) {
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
        if (this._message) {
            this.appendLogString(this._message);
        }
        for (const k of Object.keys(this.fields)) {
            this.appendLogString(`\t${k}=${this.fields[k]}`);
        }
        console.log(this.logString);
    }
    clone() {
        const l = new ApplicationLogger();
        l.level = this.level;
        l.traceID = this.traceID;
        l._message = this._message;
        return l;
    }
}
exports.ApplicationLogger = ApplicationLogger;
//# sourceMappingURL=logger.js.map