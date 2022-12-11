import {likeStatusCollection} from "./db";
import {CommentLikeStatus} from "../types/types";

export const likeStatusRepository = {
    async createCommentLikeStatus(commentId: string, userId:string, likeStatus:string) {
        const commentLikeStatus: CommentLikeStatus = {
            commentId,
            userId,
            likeStatus,
        }
        return likeStatusCollection.findOneAndUpdate({commentId, userId},{...commentLikeStatus}, {upsert:true})
    }
}