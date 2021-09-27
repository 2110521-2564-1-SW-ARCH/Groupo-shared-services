import express from "express";

export interface APIResponse<T> {
    status: number;
    body: T;
}

export const newAPIResponse = <T>(status: number, body: T): APIResponse<T> => {
    return {status, body}
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
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface ProfileResponse {
    email: string;
    firstName: string;
    lastName: string;
}

export interface UpdateProfileRequest {
    firstName: string;
    lastName: string;
}

export interface CreateBoardRequest {
    name: string;
    totalGroup: number;
    tags: Record<string, string[] >
}

export interface CreateBoardResponse {
    boardID: string;
}

export interface BoardInvitationRequest {
    members: string[];
}

export interface BoardResponse {
    name: string;
    totalGroup: number;
    totalMember: number;
    members: string[];
    isAssign: boolean;
    owner: string;
}
