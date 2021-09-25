"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.json = void 0;
const json = (res, response) => {
    res.status(response.status).json(response);
};
exports.json = json;
//# sourceMappingURL=messages.js.map