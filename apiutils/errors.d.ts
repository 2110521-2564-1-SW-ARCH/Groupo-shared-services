import express from "express";
import { APIResponse } from "./messages";
export declare class BaseAPIError extends Error {
    code: number;
    constructor(code: number, message?: string);
    response(): APIResponse<string>;
}
export declare class InternalServerError extends BaseAPIError {
    constructor(message?: string);
}
export declare class UnauthorizedError extends BaseAPIError {
    constructor(message?: string);
}
export declare class NotFoundError extends BaseAPIError {
    constructor(message?: string);
}
export declare const handler: express.ErrorRequestHandler;
export declare const catcher: (target: Object, propertyKey: string, descriptor: TypedPropertyDescriptor<express.Handler>) => void;
