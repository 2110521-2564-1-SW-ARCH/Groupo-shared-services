import express from "express";

export interface APIResponse<T> {
    status: number;
    body: T;
}

export const json = <T>(res: express.Response, response: APIResponse<T>) => {
    res.status(response.status).json(response);
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface RefreshRequest {
    refreshToken: string;
}

export interface RegisterRequest {
    displayName: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
