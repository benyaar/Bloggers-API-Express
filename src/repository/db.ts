import {MongoClient} from "mongodb"
import {VideoDBType} from "../types/types";




const mongoURi = process.env.mongoURI || "mongodb+srv://admin:admin@cluster0.9zvor.mongodb.net/?retryWrites=true&w=majority"

export const client = new MongoClient(mongoURi)
export async function runDB() {
    try{
        await client.connect()
        console.log("Successfully connect to MONGO")
    }catch {
        await client.close()
    }
}

const db = client.db("backSamurai")
export const videosCollection = db.collection<VideoDBType>("videos")