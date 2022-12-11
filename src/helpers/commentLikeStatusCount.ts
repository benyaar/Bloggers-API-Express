import {likeStatusCollection} from "../repository/db";
import {CommentDBModalType, CommentViewModalType} from "../types/types";


export const commentWithLikeStatusCount = async (findAndSortedComments: any, userId: string | undefined) => {
    let postsWithCommentLikesInfo = []
    for  (let comment of findAndSortedComments){
        const countLikes = await likeStatusCollection.countDocuments({commentId: comment.id, likeStatus:"Like"})
        const countDislikes = await likeStatusCollection.countDocuments({commentId: comment.id, likeStatus:"Dislike"})

        const findCommentWithLikesByUserId = await likeStatusCollection.findOne({commentId: comment.id, userId})

        comment.likesInfo.likesCount = countLikes
        comment.likesInfo.dislikesCount = countDislikes
        if(findCommentWithLikesByUserId){
            comment.likesInfo.myStatus = findCommentWithLikesByUserId.likeStatus
        } else {
            comment.likesInfo.myStatus = "None"
        }

        postsWithCommentLikesInfo.push(comment)
    }
    return postsWithCommentLikesInfo
}

