import {Collection, MongoClient} from "mongodb";

const client = new MongoClient(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`);

let loggingCollection: Collection = null;

export const initMongoDBConnection = async () => {
    await client.connect();
    const db = client.db("groupo");
    loggingCollection = db.collection("logging");
};

const getLoggingCollection = async () => {
    if (loggingCollection === null) {
        await initMongoDBConnection();
    }
    return loggingCollection;
};

export const saveLog = (object: any) => {
    getLoggingCollection().then(c => {
        c.insertOne(object).then();
    });
};
