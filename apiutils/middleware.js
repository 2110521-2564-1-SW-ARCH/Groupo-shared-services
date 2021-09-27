"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpLogger = void 0;
const httpLogger = (req, res, next) => {
    console.log(req);
    console.log(req.url);
    console.log(req.params);
    console.log(req.header);
    console.log(req.body);
};
exports.httpLogger = httpLogger;
//# sourceMappingURL=middleware.js.map