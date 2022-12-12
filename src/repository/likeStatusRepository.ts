import {likeStatusCollection} from "./db";
import {LikeStatus} from "../types/types";

export const likeStatusRepository = {
    async createLikeStatus(commentId: string, userId:string, login: string, likeStatus:string) {
        const commentLikeStatus: LikeStatus = {
            parentId: commentId,
            userId,
            login,
            createdAt: new Date(),
            likeStatus,
        }
        return likeStatusCollection.findOneAndUpdate({parentId: commentId, userId},{...commentLikeStatus}, {upsert:true})
    }
}