import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {APIResponse} from "./response";

export class BaseAPIError extends Error {
    code: number;

    constructor(code: number, message?: string) {
        super();
        this.code = code;
        if (message) {
            this.message = message;
        } else {
            this.message = getReasonPhrase(code);
        }
    }

    response(): APIResponse<string> {
        return {
            status: this.code,
            body: this.message,
        };
    }
}

export class InternalServerError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class UnauthorizedError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class NotFoundError extends BaseAPIError {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}
