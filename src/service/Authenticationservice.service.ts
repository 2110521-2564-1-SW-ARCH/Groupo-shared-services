import {JwtPayload} from "jsonwebtoken";

export declare interface Token extends JwtPayload {
    email: string;
}