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
exports.initRabbitMQConnection = exports.subscribe = exports.publish = exports.getChannel = exports.RabbitMQQueue = void 0;
const amqplib_1 = __importDefault(require("amqplib"));
const logger_1 = require("../services/logger");
exports.RabbitMQQueue = "logging";
let channel = null;
const logger = logger_1.logger.set("RABBITMQ_HOST", process.env.RABBITMQ_HOST).set("RABBITMQ_PORT", process.env.RABBITMQ_PORT).set("QUEUE", exports.RabbitMQQueue);
const getChannel = () => __awaiter(void 0, void 0, void 0, function* () {
    if (channel === null) {
        try {
            return yield (0, exports.initRabbitMQConnection)();
        }
        catch (err) {
            console.error("cannot init rabbitmq connection");
        }
    }
    return Promise.resolve(channel);
});
exports.getChannel = getChannel;
const publish = (queue, b) => {
    (0, exports.getChannel)().then(ch => {
        ch.sendToQueue(queue, b);
    });
};
exports.publish = publish;
const subscribe = (queue, callback) => {
    (0, exports.getChannel)().then(ch => {
        ch.consume(queue, (msg) => {
            if (msg !== null) {
                callback(msg.content);
                ch.ack(msg);
            }
        }).then();
    });
};
exports.subscribe = subscribe;
const initRabbitMQConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    const conn = yield amqplib_1.default.connect(`amqp://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
    const ch = yield conn.createChannel();
    yield ch.assertQueue(exports.RabbitMQQueue);
    console.info("connect to rabbitmq connection successfully");
    return ch;
});
exports.initRabbitMQConnection = initRabbitMQConnection;
//# sourceMappingURL=rabbitmq.js.map