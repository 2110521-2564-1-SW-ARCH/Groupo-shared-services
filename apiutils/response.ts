import express from "express";

export interface APIResponse<T> {
    status: number;
    body: T;
}

export const json = <T>(res: express.Response, response: APIResponse<T>) => {
    res.status(response.status).json(response);
}
