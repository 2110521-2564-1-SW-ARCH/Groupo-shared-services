import amqp, {ConsumeMessage} from "amqplib";
import {handler as grpcHandler, logger as lg} from "../services/logger";
import {LoggingGrpcClient} from "../grpc/client";

export const RabbitMQQueue = "logging";

let channel: amqp.Channel | null = null;

const logger = lg.set("RABBITMQ_HOST", process.env.RABBITMQ_HOST).set("RABBITMQ_PORT", process.env.RABBITMQ_PORT).set("QUEUE", RabbitMQQueue);

export const getChannel = async (): Promise<amqp.Channel> => {
    if (channel === null) {
        try {
            return await initRabbitMQConnection();
        } catch (err) {
            console.error("cannot init rabbitmq connection");
        }
    }
    return Promise.resolve(channel);
};

export const publish = (queue: string, b: Buffer) => {
    getChannel().then(ch => {
        ch.sendToQueue(queue, b);
    });
};

export const subscribe = (queue: string, callback: (msg: Buffer) => void) => {
    getChannel().then(ch => {
        ch.consume(queue, (msg: ConsumeMessage | null) => {
            if (msg !== null) {
                callback(msg.content);
                ch.ack(msg);
            }
        }).then();
    });
};

export const initRabbitMQConnection = async (): Promise<amqp.Channel> => {
    const conn = await amqp.connect(`amqp://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);

    const ch = await conn.createChannel();
    await ch.assertQueue(RabbitMQQueue);
    console.info("connect to rabbitmq connection successfully");
    return ch;
};
