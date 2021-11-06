"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSocketIOContext = exports.getSocketIOHandshakeQuery = void 0;
const authentication_1 = require("./authentication");
const logger_1 = require("./logger");
/**
 * get the handshake query when the socket connection is establish
 * @param socket connected socket instance
 */
const getSocketIOHandshakeQuery = (socket) => {
    return socket.handshake.query;
};
exports.getSocketIOHandshakeQuery = getSocketIOHandshakeQuery;
const getSocketIOContext = (service, io, socket) => {
    const { token, boardID } = (0, exports.getSocketIOHandshakeQuery)(socket);
    try {
        const email = (0, authentication_1.verifyToken)(token).email;
        const socketIOLogger = logger_1.logger.set("email", boardID).set("boardID", boardID);
        socketIOLogger.service(service);
        socket.join(boardID);
        return { io, logger: socketIOLogger, roomID: boardID, boardID, email };
    }
    catch (err) {
        socket.disconnect();
        return null;
    }
};
exports.getSocketIOContext = getSocketIOContext;
//# sourceMappingURL=socketio.js.map