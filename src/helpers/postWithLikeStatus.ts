import {likeStatusCollection} from "../repository/db";



export const postWithLikeStatus = async (findAndSortedPost: any, userId: string | undefined) => {
    let postWithLikeStatus = []
    for  (let post of findAndSortedPost){
        const countLikes = await likeStatusCollection.countDocuments({parentId: post.id, likeStatus:"Like"})
        const countDislikes = await likeStatusCollection.countDocuments({commentId: post.id, likeStatus:"Dislike"})

        const findPostWithLikesByUserId = await likeStatusCollection.findOne({post: post.id, userId})

        post.extendedLikesInfo.likesCount = countLikes
        post.extendedLikesInfo.dislikesCount = countDislikes
        if(findPostWithLikesByUserId){
            post.extendedLikesInfo.myStatus = findPostWithLikesByUserId.likeStatus
        } else {
            post.likesInfo.myStatus = "None"
        }

        postWithLikeStatus.push(post)
    }
    return postWithLikeStatus
}

