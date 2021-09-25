import {getReasonPhrase, StatusCodes} from "http-status-codes";
import {APIResponse} from "../interfaces/api.interface";

export class APIError extends Error {
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

export class InternalServerError extends APIError {
    constructor(message?: string) {
        super(StatusCodes.INTERNAL_SERVER_ERROR, message);
    }
}

export class UnauthorizedError extends APIError {
    constructor(message?: string) {
        super(StatusCodes.UNAUTHORIZED, message);
    }
}

export class NotFoundError extends APIError {
    constructor(message?: string) {
        super(StatusCodes.NOT_FOUND, message);
    }
}
