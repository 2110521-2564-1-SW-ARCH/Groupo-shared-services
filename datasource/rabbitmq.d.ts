/// <reference types="node" />
export declare const RabbitMQQueue = "logging";
export declare const publish: (queue: string, b: Buffer) => Promise<void>;
export declare const subscribe: (queue: string, callback: (msg: Buffer) => void) => Promise<void>;
