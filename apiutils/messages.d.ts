import express from "express";
export interface APIResponse<T> {
    status: number;
    body: T;
}
export declare const json: <T>(res: express.Response, response: APIResponse<T>) => void;
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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}
