import mongoose from "mongoose";
import {
    AttemptsType,
    BlogDBType,
    CommentDBModalType,
    PostDBType,
    TokenType,
    UserDBType,
    UserSessionsType,
    VideoDBType
} from "./types";
import {ObjectId} from "mongodb";

export const VideoModelScheme = new mongoose.Schema<VideoDBType>({
    id: Number,
    title: String,
    author: String,
    canBeDownloaded: Boolean,
    minAgeRestriction: Number,
    createdAt: Date,
    publicationDate: Date,
    availableResolutions: [],
    _id: ObjectId
})

export const BlogsDBModalScheme = new mongoose.Schema<BlogDBType>({
    _id: {type:ObjectId, select:false},
    id: String,
    name: String,
    description: String,
    websiteUrl: String,
    createdAt: Date,
})
export const  PostDBModalScheme = new mongoose.Schema<PostDBType>({
    _id: ObjectId,
    id: String,
    title: String,
    shortDescription: String,
    content: String,
    blogId: String,
    blogName: String,
    createdAt: Date,
})

export const UserDBModalScheme = new mongoose.Schema<UserDBType>({
    _id: ObjectId,
    id: String,
    login: String,
    email: String,
    createdAt: Date,
    passwordHash: String,
    emailConfirmation: {
        confirmationCode: String,
        expirationDate: Date,
        isConfirmed: Boolean,
    }
})
export const CommentDBModalScheme = new mongoose.Schema<CommentDBModalType>({
    _id: ObjectId,
    id: String,
    content: String,
    userId: String,
    userLogin: String,
    createdAt: Date,
    postId: String
})

export const AttemptsModalScheme = new mongoose.Schema<AttemptsType>({
    userIP: String,
    url: String,
    time: Date
})

export const TokenModalScheme = new mongoose.Schema<TokenType>({
    refreshToken: String
})

export const UserSessionsScheme = new mongoose.Schema<UserSessionsType>({
    ip: String,
    title: String,
    lastActiveDate: Number,
    deviceId: String,
    userId:String,

})