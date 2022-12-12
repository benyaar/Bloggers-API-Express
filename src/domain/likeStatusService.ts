import {likeStatusRepository} from "../repository/likeStatusRepository";

export const likeStatusService = {
    async addLikeStatus(parentId: string, userId: string, login: string, likeStatus:string) {
        return  likeStatusRepository.createLikeStatus(parentId, userId, login, likeStatus)

    },
}