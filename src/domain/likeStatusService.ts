import {likeStatusRepository} from "../repository/likeStatusRepository";

export const likeStatusService = {
    async addLikeStatus(parentId: string, userId: string, likeStatus:string) {
        return  likeStatusRepository.createCommentLikeStatus(parentId, userId, likeStatus)

    },
}