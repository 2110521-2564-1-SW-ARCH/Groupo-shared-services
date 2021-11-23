import express from "express";
export interface APIResponse<T> {
    status: number;
    body: T;
}
export declare const newAPIResponse: <T>(status: number, body: T) => APIResponse<T>;
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
    tags: string[];
}
export interface CreateBoardResponse {
    boardID: string;
}
export interface BoardInvitationRequest {
    members: string[];
}
export interface BoardResponse {
    boardID: string;
    owner: string;
    name: string;
    tags: TagResponse[];
    isAssign: boolean;
    unTaggedMember: string[];
    unAssignedMember: string[];
    unAssignedMemberObj: any[];
    groups: GroupResponse[];
    totalGroups: number;
    totalMembers: number;
}
export interface GroupResponse {
    groupID: string;
    name: string;
    description: string;
    members: string[];
    membersObj: any[];
    tags: string[];
    capacity: number;
}
export interface TagResponse {
    name: string;
    members: string[];
}
export interface MemberResponse {
    email: string;
    boardID: string;
    groupID: string | null;
}
export interface UpdateGroupRequest {
    name: string;
    description: string | null;
}
export interface CreateGroupRequest {
    boardID: string;
    name: string;
    description: string | null;
}
export interface CreateGroupResponse {
    groupID: string;
}
