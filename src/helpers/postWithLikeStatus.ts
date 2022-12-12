import {likeStatusCollection} from "../repository/db";
import {LikeStatus} from "../types/types";


export const postWithLikeStatus = async (findAndSortedPost: any, userId: string | undefined) => {
    let postWithLikeStatus = []
    for  (let post of findAndSortedPost){
        const countLikes = await likeStatusCollection.countDocuments({parentId: post.id, likeStatus:"Like"})
        const countDislikes = await likeStatusCollection.countDocuments({parentId: post.id, likeStatus:"Dislike"})
        const findPostWithLikesByUserId = await likeStatusCollection.findOne({parentId: post.id, userId})
        const findNewestPost = await likeStatusCollection.find({
            parentId: post.id,
            likeStatus: 'Like'
        }, {_id:0, __v: 0, parentId: 0, likeStatus:0 }, {sort: {_id: -1}, limit: 3})


        post.extendedLikesInfo.likesCount = countLikes
        post.extendedLikesInfo.dislikesCount = countDislikes
        post.extendedLikesInfo.newestLikes = findNewestPost

        if(findPostWithLikesByUserId){
            post.extendedLikesInfo.myStatus = findPostWithLikesByUserId.likeStatus
        } else {
            post.extendedLikesInfo.myStatus = "None"
        }

        postWithLikeStatus.push(post)
    }
    return postWithLikeStatus
}

