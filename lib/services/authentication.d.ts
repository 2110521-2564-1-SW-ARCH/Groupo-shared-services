import { JwtPayload } from "jsonwebtoken";
import { UnauthorizedError } from "../apiutils/errors";
export declare class AccessTokenExpiredError extends UnauthorizedError {
    constructor();
}
export declare type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN";
export interface Token extends JwtPayload {
    type: TokenType;
    email: string;
}
export declare const generateAccessToken: (email: string) => string;
export declare const generateRefreshToken: (email: string) => string;
export declare const verifyToken: (token: string) => Token;
