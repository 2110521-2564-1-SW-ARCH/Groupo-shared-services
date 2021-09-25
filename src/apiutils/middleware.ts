import express from "express";
import {json} from "./response";
import {BaseAPIError, InternalServerError} from "./errors";

export const handler: express.ErrorRequestHandler = (err: any, req: express.Request, res: express.Response, next) => {
    switch (true) {
        case err instanceof BaseAPIError:
            json(res, err.response());
            break;
        default:
            console.log("internal server error:", err.message);
            json(res, new InternalServerError().response());
    }
}
