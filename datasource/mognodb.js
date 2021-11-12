"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveLog = exports.initMongoDBConnection = void 0;
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`);
let loggingCollection = null;
const initMongoDBConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    yield client.connect();
    const db = client.db("groupo");
    loggingCollection = db.collection("logging");
});
exports.initMongoDBConnection = initMongoDBConnection;
const getLoggingCollection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (loggingCollection === null) {
        yield (0, exports.initMongoDBConnection)();
    }
    return loggingCollection;
});
const saveLog = (object) => {
    getLoggingCollection().then(c => {
        c.insertOne(object).then();
    });
};
exports.saveLog = saveLog;
//# sourceMappingURL=mognodb.js.map