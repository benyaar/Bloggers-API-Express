
import {
    AttemptsType,
    BlogDBType,
    CommentDBModalType,
    PostDBType,
    TokenType,
    UserDBType,
    VideoDBType
} from "../types/types";
import * as mongoose from "mongoose";
import {
    AttemptsModalScheme,
    BlogsDBModalScheme,
    CommentDBModalScheme,
    PostDBModalScheme, TokenModalScheme,
    UserDBModalScheme,
    VideoModelScheme
} from "../types/mongooseScheme";

const mongoURi = process.env.mongoURI || "mongodb+srv://admin:admin@cluster0.9zvor.mongodb.net/?retryWrites=true&w=majority"

//export const client = new MongoClient(mongoURi)
const dbName = "backSamurai"

export async function runDB() {
    try{
        await mongoose.connect(mongoURi+'/'+dbName)
        console.log("Successfully connect to MONGO")
    }catch {
        await mongoose.disconnect()
    }
}

export const videosCollection =  mongoose.model<VideoDBType>('videos', VideoModelScheme)
export const bloggersCollection = mongoose.model<BlogDBType>('blogs', BlogsDBModalScheme)
export const postsCollection = mongoose.model<PostDBType>('posts', PostDBModalScheme)
export const usersCollection = mongoose.model<UserDBType>('users', UserDBModalScheme)
export const commentsCollection = mongoose.model<CommentDBModalType>('comments', CommentDBModalScheme)
export const attemptsCollection = mongoose.model<AttemptsType>('attemps', AttemptsModalScheme)
export const tokenBlackListCollection = mongoose.model<TokenType>('tokenBlackList', TokenModalScheme)

// export const videosCollection = db.collection<VideoDBType>("videos")
// export const bloggersCollection = db.collection<BlogDBType>("blogs")
// export const postsCollection = db.collection<PostDBType>("posts")
// export const usersCollection = db.collection<UserDBType>("users")
// export const commentsCollection = db.collection<CommentDBModalType>("comments")
// export const attemptsCollection = db.collection<AttemptsType>("attempts")
// export const tokenBlackListCollection = db.collection<TokenType>('tokenBlackList')


