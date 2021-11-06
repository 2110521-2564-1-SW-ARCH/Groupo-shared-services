import {Server, Socket} from "socket.io";
import {DefaultEventsMap} from "socket.io/dist/typed-events";
import {SocketIOCtx, SocketIOHandshakeQuery} from "../types/socketio";
import {verifyToken} from "./authentication";
import {logger} from "./logger";

/**
 * get the handshake query when the socket connection is establish
 * @param socket connected socket instance
 */
export const getSocketIOHandshakeQuery = (socket: Socket<DefaultEventsMap, DefaultEventsMap>): SocketIOHandshakeQuery => {
    return socket.handshake.query as any as SocketIOHandshakeQuery;
};

export const getSocketIOContext = (io: Server<DefaultEventsMap, DefaultEventsMap>, socket: Socket<DefaultEventsMap, DefaultEventsMap>): SocketIOCtx | null => {
    const {token, boardID} = getSocketIOHandshakeQuery(socket);

    try {
        const email = verifyToken(token).email;
        const socketIOLogger = logger.set("email", email).set("boardID", boardID).set("socketID", socket.id);
        socket.join(boardID);
        return {io, logger: socketIOLogger, roomID: boardID, boardID, email};
    } catch (err) {
        socket.disconnect();
        return null;
    }
};
