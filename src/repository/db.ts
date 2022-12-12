import {
    AttemptsType,
    BlogDBType,
    CommentDBModalType, LikeStatus,
    PostDBType, RecoveryCodeType,
    TokenType,
    UserDBType, UserSessionsType,
    VideoDBType
} from "../types/types";
import * as mongoose from "mongoose";
import {
    AttemptsModalScheme,
    BlogsDBModalScheme,
    CommentDBModalScheme, LikeStatusScheme,
    PostDBModalScheme, RecoveryCodeScheme, TokenModalScheme,
    UserDBModalScheme, UserSessionsScheme,
    VideoModelScheme
} from "../types/mongooseScheme";

const mongoURI = process.env.mongoURI || "mongodb+srv://admin:admin@backapi.wojaaxk.mongodb.net/?retryWrites=true&w=majority";

//const mongoURI = process.env.mongoURI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.1";


export const videosCollection =  mongoose.model<VideoDBType>('videos', VideoModelScheme)
export const bloggersCollection = mongoose.model<BlogDBType>('blogs', BlogsDBModalScheme)
export const postsCollection = mongoose.model<PostDBType>('posts', PostDBModalScheme)
export const usersCollection = mongoose.model<UserDBType>('users', UserDBModalScheme)
export const commentsCollection = mongoose.model<CommentDBModalType>('comments', CommentDBModalScheme)
export const attemptsCollection = mongoose.model<AttemptsType>('attempts', AttemptsModalScheme)
export const tokenBlackListCollection = mongoose.model<TokenType>('tokenBlackList', TokenModalScheme)
export const usersSessionsCollection = mongoose.model<UserSessionsType>('userSessions', UserSessionsScheme)
export const recoveryCodeCollection = mongoose.model<RecoveryCodeType>('recoveryCode', RecoveryCodeScheme )
export const likeStatusCollection = mongoose.model<LikeStatus>('likeStatus', LikeStatusScheme)

// export const videosCollection = db.collection<VideoDBType>("videos")
// export const bloggersCollection = db.collection<BlogDBType>("blogs")
// export const postsCollection = db.collection<PostDBType>("posts")
// export const usersCollection = db.collection<UserDBType>("users")
// export const commentsCollection = db.collection<CommentDBModalType>("comments")
// export const attemptsCollection = db.collection<AttemptsType>("attempts")
// export const tokenBlackListCollection = db.collection<TokenType>('tokenBlackList')

export async function runDB() {
    try {
        await mongoose.connect(mongoURI)
        console.log("Connected successfully to mongoose server")
    } catch {
        await mongoose.disconnect()
        console.log("Not connected")
    }
}




