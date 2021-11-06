import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { ApplicationLogger } from "../services/logger";
/**
 * SocketIOCtx contains necessary to handle socketIO event
 */
export interface SocketIOCtx {
    /**
     * socket io server
     */
    io: Server<DefaultEventsMap, DefaultEventsMap>;
    /**
     * socket io logger contains information about socket connection
     */
    logger: ApplicationLogger;
    /**
     * room id that the user is joined
     */
    roomID: string;
    /**
     * email of the user
     */
    email: string;
}
/**
 * HandshakeQuery is set of query parameters that provided
 */
export interface SocketIOHandshakeQuery {
    /**
     * boardID is used to be a roomID of socket io architecture
     */
    boardID: string;
    /**
     * jwt token of the user that connect to socket
     */
    token: string;
}
