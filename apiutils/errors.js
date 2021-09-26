"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.catcher = exports.handler = exports.NotFoundError = exports.UnauthorizedError = exports.InternalServerError = exports.BaseAPIError = void 0;
const http_status_codes_1 = require("http-status-codes");
const messages_1 = require("./messages");
const logger_1 = require("../logging/logger");
class BaseAPIError extends Error {
    constructor(code, message) {
        super();
        this.code = code;
        if (message) {
            this.message = message;
        }
        else {
            this.message = (0, http_status_codes_1.getReasonPhrase)(code);
        }
    }
    response() {
        return {
            status: this.code,
            body: this.message,
        };
    }
}
exports.BaseAPIError = BaseAPIError;
class InternalServerError extends BaseAPIError {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}
exports.InternalServerError = InternalServerError;
class UnauthorizedError extends BaseAPIError {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.UNAUTHORIZED, message);
    }
}
exports.UnauthorizedError = UnauthorizedError;
class NotFoundError extends BaseAPIError {
    constructor(message) {
        super(http_status_codes_1.StatusCodes.NOT_FOUND, message);
    }
}
exports.NotFoundError = NotFoundError;
const handler = (err, req, res, next) => {
    switch (true) {
        case err instanceof BaseAPIError:
            logger_1.logger.field("error", err).error("api error");
            (0, messages_1.json)(res, err.response());
            break;
        default:
            logger_1.logger.field("error", err).error("internal server error");
            (0, messages_1.json)(res, new InternalServerError().response());
    }
};
exports.handler = handler;
const catcher = (handler) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield handler(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });
};
exports.catcher = catcher;
//# sourceMappingURL=errors.js.map