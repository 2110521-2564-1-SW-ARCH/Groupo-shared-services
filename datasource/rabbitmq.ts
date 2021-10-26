import amqp, {ConsumeMessage} from "amqplib";
import {handler as grpcHandler, logger as lg} from "../services/logger";
import {LoggingGrpcClient} from "../grpc/client";

export const RabbitMQQueue = "logging";

let channel: amqp.Channel | null = null;

const logger = lg.set("RABBITMQ_PORT", process.env.RABBITMQ_PORT).set("QUEUE", RabbitMQQueue);


const getChannel = async (): Promise<amqp.Channel> => {
    if (channel === null) {
        try {
            channel = await initRabbitMQConnection();
            LoggingGrpcClient.Info(logger.message("connect to rabbitmq successfully").proto(), grpcHandler)
        } catch (err) {
            LoggingGrpcClient.Error(logger.set("error", err).message("cannot connect to rabbitmq").proto(), grpcHandler)
        }
    }
    return channel;
}

export const publish = (queue: string, b: Buffer) => {
    getChannel().then(channel => {
        channel.sendToQueue(queue, b);
    })
}

export const subscribe = (queue: string, callback: (msg: Buffer) => void) => {
    getChannel().then(channel => {
        channel.consume(queue, (msg: ConsumeMessage | null) => {
            if (msg !== null) {
                callback(msg.content);
                channel.ack(msg);
            }
        }).then();
    })
}

export const initRabbitMQConnection = async (): Promise<amqp.Channel> => {
    const conn = await amqp.connect('amqp://guest:guest@localhost:' + process.env.RABBITMQ_PORT)

    const channel = await conn.createChannel();
    await channel.assertQueue(RabbitMQQueue);
    return channel;
}
