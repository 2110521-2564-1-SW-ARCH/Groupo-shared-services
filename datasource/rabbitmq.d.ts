/// <reference types="node" />
import amqp from "amqplib";
export declare const RabbitMQQueue = "logging";
export declare const getChannel: () => Promise<amqp.Channel>;
export declare const publish: (queue: string, b: Buffer) => void;
export declare const subscribe: (queue: string, callback: (msg: Buffer) => void) => void;
export declare const initRabbitMQConnection: () => Promise<amqp.Channel>;
