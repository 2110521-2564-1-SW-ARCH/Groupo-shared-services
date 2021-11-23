import amqp, {ConsumeMessage} from "amqplib";

export const RabbitMQQueue = "logging";

let conn: amqp.Connection | null = null;

const getConnection = async (): Promise<amqp.Connection> => {
    if (conn === null) {
        conn = await amqp.connect(`amqp://guest:guest@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`);
        console.info("connect to rabbitmq connection successfully");
    }
    return conn;
};

export const publish = async (queue: string, b: Buffer) => {
    const ch = await conn.createChannel();
    await ch.assertQueue(RabbitMQQueue);
    ch.sendToQueue(queue, b);
};

export const subscribe = async (queue: string, callback: (msg: Buffer) => void) => {
    const ch = await conn.createChannel();
    await ch.consume(queue, (msg: ConsumeMessage | null) => {
        if (msg !== null) {
            callback(msg.content);
            ch.ack(msg);
        }
    });
};

