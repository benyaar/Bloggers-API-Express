import {CommentDBModalType, UserDBType} from "../types/types";
import {commentsCollection} from "./db";



export const commentsRepository = {
    async createNewComments(newComment: CommentDBModalType) {
         return commentsCollection.insertMany(newComment)
    },

    async updateComment(id: string, content: string, user:UserDBType){
        const updateComment = await commentsCollection.updateOne({id, userId: user.id}, {$set: {content}})
        return updateComment.matchedCount === 1
    },
    async deleteComment(id:string, user: UserDBType){
        const deleteComment = await commentsCollection.deleteOne({id, userId: user.id})
        return deleteComment.deletedCount === 1
    },

    // async deleteLikeStatus(userId:string, commentId:string){
    //     console.log(userId)
    //     console.log(commentId)
    //     const deleteLikeStatus = await commentsCollection.findOneAndUpdate(
    //         {id: commentId},
    //         { $pull: {likesList: {$elemMatch:  {userId: userId}}}},
    //     )
    //
    // }

}