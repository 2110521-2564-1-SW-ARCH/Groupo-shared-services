"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerApplicationLogger = exports.logger = exports.ApplicationLogger = void 0;
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
        this._service = "";
        this._traceID = "";
        this._fields = {};
        this.logString = "";
    }
    service(s) {
        const l = this.clone();
        l._service = s;
        return l;
    }
    traceID(s) {
        const l = this.clone();
        l._traceID = s;
        return l;
    }
    field(key, value) {
        const l = this.clone();
        l._fields[key] = value;
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
        this.initLogString(`[${t.toDateString()}] [${t.toTimeString()}]`);
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
            this.appendLogString(s);
        }
        for (const k of Object.keys(this._fields)) {
            this.appendLogString(`  ${colors.cyan}${k}${colors.reset}=${colors.cyan}${this._fields[k]}${colors.reset}`);
        }
        console.log(this.logString);
    }
    clone() {
        const l = new ApplicationLogger();
        l.traceID = this.traceID;
        l._fields = Object.assign({}, this._fields);
        return l;
    }
}
exports.ApplicationLogger = ApplicationLogger;
exports.logger = new ApplicationLogger();
const registerApplicationLogger = (service) => {
    exports.logger.service(service);
};
exports.registerApplicationLogger = registerApplicationLogger;
//# sourceMappingURL=logger.js.map