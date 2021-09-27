"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.registerApplicationLogger = exports.logger = exports.ApplicationLogger = void 0;
const dayjs_1 = __importDefault(require("dayjs"));
class ApplicationLogger {
    constructor() {
        this._service = "";
        this._traceID = "";
        this._message = "";
        this._fields = {};
    }
    service(s) {
        this._service = s;
    }
    traceID(s) {
        const l = this.clone();
        l._traceID = s;
        return l;
    }
    set(k, v) {
        const l = this.clone();
        l._fields[k] = v;
        return l;
    }
    message(s) {
        const l = this.clone();
        l._message = s;
        return l;
    }
    proto() {
        return {
            timestamp: (0, dayjs_1.default)().unix(),
            service: this._service,
            traceID: this._traceID,
            message: this._message,
            fields: this._fields,
        };
    }
    clone() {
        const l = new ApplicationLogger();
        l._service = this._service;
        l._traceID = this._traceID;
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
const handler = (err, { msg }) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log(msg);
    }
};
exports.handler = handler;
//# sourceMappingURL=logger.js.map