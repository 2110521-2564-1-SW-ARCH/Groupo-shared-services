import amqp from "amqplib";
export declare const RabbitMQQueue = "logging";
export declare const getQueue: () => Promise<amqp.Channel>;
export declare const initRabbitMQConnection: () => Promise<amqp.Channel>;
