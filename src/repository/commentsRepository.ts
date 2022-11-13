import {CommentDBModalType} from "../types/types";
import {commentsCollection} from "./db";


export const commentsRepository = {
    async createNewComments(newComment: CommentDBModalType) {
         return commentsCollection.insertOne(newComment)
    },
    async updateComment(id: string, content: string){
        const updateComment = await commentsCollection.updateOne({id}, {$set: {content}})
        return updateComment.matchedCount === 1
    },
    async deleteComment(id:string){
        const deleteComment = await commentsCollection.deleteOne({id})
        return deleteComment.deletedCount === 1
    }
}