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

    generateAccessToken(token: Token): string {
        return sign(token, this.secret, {expiresIn: "1h"});
    }

    generateRefreshToken(token: Token): string {
        return sign(token, this.secret);
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