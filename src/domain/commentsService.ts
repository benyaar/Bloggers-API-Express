import {CommentDBModalType, UserDBType} from "../types/types";
import {ObjectId} from "mongodb";
import {commentsRepository} from "../repository/commentsRepository";


export const commentsService = {
    async createNewComments (content: string, user: UserDBType, postId:string) {
        const newComment: CommentDBModalType = {
            _id: new ObjectId(),
            id: new ObjectId().toString(),
            content: content,
            userId: user.id,
            userLogin: user.login,
            createdAt: new Date(),
            postId: postId
        }
        await commentsRepository.createNewComments(newComment)
        return newComment
    },
    async updateComment (id: string, content: string, user: UserDBType){

        return commentsRepository.updateComment(id, content, user)
    },
    async deleteComment (id: string, user: UserDBType){
        return commentsRepository.deleteComment(id, user)
    }
}