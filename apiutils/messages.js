"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = exports.newAPIResponse = void 0;
const newAPIResponse = (status, body) => {
    return { status, body };
};
exports.newAPIResponse = newAPIResponse;
const json = (res, response) => {
    res.status(response.status).json(response);
};
exports.json = json;
//# sourceMappingURL=messages.js.map