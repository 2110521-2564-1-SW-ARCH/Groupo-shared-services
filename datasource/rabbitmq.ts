import amqp from "amqplib";
import {handler as grpcHandler, logger as lg} from "../services/logger";
import {LoggingGrpcClient} from "../grpc/client";

export const RabbitMQQueue = "logging";

let channel: amqp.Channel | null = null;

export const getQueue = async (): Promise<amqp.Channel>  => {
    const logger = lg.set("RABBITMQ_PORT", process.env.RABBITMQ_PORT).set("QUEUE", RabbitMQQueue);

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

export const initRabbitMQConnection = async (): Promise<amqp.Channel> => {
    const conn = await amqp.connect('amqp://guest:guest@localhost:' + process.env.RABBITMQ_PORT)

    const channel = await conn.createChannel();
    await channel.assertQueue(RabbitMQQueue);
    return channel;
}
