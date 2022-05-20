import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

export const MONGODB_URI = process.env['MONGODB_URI'];
export const MONGODB_DB = "ttrack";

if (!MONGODB_URI) {
    throw new Error('Please define the mongoURI property inside config/default.json');
}

if (!MONGODB_DB) {
    throw new Error('Please define the mongoDB property inside config/default.json');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
    cached = global.mongo = { conn: null, promise: null };
}

export let connectToDatabase = async () => {
    console.log("Step 1")
    if (cached.conn) {
        return cached.conn;
    }
    console.log("Step 2")
    if (!cached.promise) {
        const opts = {
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        console.log("Step 2.5")
        cached.promise = MongoClient.connect(MONGODB_URI, opts).then((client) => {
            return {
                client,
                db: client.db(MONGODB_DB)
            };
        })
    }
    console.log("Step 3")
    cached.conn = await cached.promise;
    console.log("Step 4")
    return cached.conn;
}
