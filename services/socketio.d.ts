import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { SocketIOCtx, SocketIOHandshakeQuery } from "../types/socketio";
/**
 * get the handshake query when the socket connection is establish
 * @param socket connected socket instance
 */
export declare const getSocketIOHandshakeQuery: (socket: Socket<DefaultEventsMap, DefaultEventsMap>) => SocketIOHandshakeQuery;
/**
 * get socket io context
 * @param io socket io server
 * @param socket connected socket
 */
export declare const getSocketIOContext: (io: Server<DefaultEventsMap, DefaultEventsMap>, socket: Socket<DefaultEventsMap, DefaultEventsMap>) => SocketIOCtx | null;
