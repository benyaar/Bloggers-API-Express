import {MongoClient} from "mongodb"
import {BlogDBType, PostDBType, VideoDBType} from "../types/types";


//"mongodb+srv://admin:admin@cluster0.9zvor.mongodb.net/?retryWrites=true&w=majority" ||

const mongoURi = process.env.mongoURI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1"

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
export const bloggersCollection = db.collection<BlogDBType>("blogs")
export const postsCollection = db.collection<PostDBType>("posts")