import {likeStatusCollection} from "./db";
import {LikeStatus} from "../types/types";

export const likeStatusRepository = {
    async createCommentLikeStatus(commentId: string, userId:string, likeStatus:string) {
        const commentLikeStatus: LikeStatus = {
            parentId: commentId,
            userId,
            likeStatus,
        }
        return likeStatusCollection.findOneAndUpdate({parentId: commentId, userId},{...commentLikeStatus}, {upsert:true})
    }
}