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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = exports.publish = exports.RabbitMQQueue = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
exports.RabbitMQQueue = "logging";
let conn = null;
const getConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    if (conn === null) {
        conn = yield amqplib_1.default.connect(`amqp://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
        console.info("connect to rabbitmq connection successfully");
    }
    return conn;
});
const publish = (queue, b) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield getConnection();
    const ch = yield connection.createChannel();
    yield ch.assertQueue(exports.RabbitMQQueue);
    ch.sendToQueue(queue, b);
});
exports.publish = publish;
const subscribe = (queue, callback) => __awaiter(void 0, void 0, void 0, function* () {
    const connection = yield getConnection();
    const ch = yield connection.createChannel();
    yield ch.consume(queue, (msg) => {
        if (msg !== null) {
            callback(msg.content);
            ch.ack(msg);
        }
    });
});
exports.subscribe = subscribe;
//# sourceMappingURL=rabbitmq.js.map