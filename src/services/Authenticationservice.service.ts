import {JwtPayload, sign, verify} from "jsonwebtoken";
import {UnauthorizedError} from "../error/instance";

export class AccessTokenExpiredError extends UnauthorizedError {
    constructor() {
        super("Access Token Expired");
    }
}

export type TokenType = "ACCESS_TOKEN" | "REFRESH_TOKEN";

export interface Token extends JwtPayload {
    type: TokenType;
    email: string;
}

export class AuthenticationService {
    private secret: string = process.env.JWT_SECRET;

    generateAccessToken(email: string): string {
        const payload: Token = {email, type: "ACCESS_TOKEN"};
        return sign(payload, this.secret, {expiresIn: "1h"});
    }

    generateRefreshToken(email: string): string {
        const payload: Token = {email, type: "REFRESH_TOKEN"};
        return sign(payload, this.secret);
    }

    verify(token: string): Token {
        try {
            const decoded = verify(token, this.secret);
            if (typeof decoded === "string") {
                return JSON.parse(decoded);
            }
            return decoded as Token;
        } catch (e) {
            if (e.message === "jwt expired") {
                throw new AccessTokenExpiredError();
            }
            throw e;
        }
    }
}

export const authenticationService = new AuthenticationService();