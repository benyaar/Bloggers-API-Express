import {likeStatusCollection} from "../repository/db";


export const postWithLikeStatus = async (findAndSortedPost: any, userId: string | undefined) => {
    let postWithLikeStatus = []
    for  (let post of findAndSortedPost){
        const countLikes = await likeStatusCollection.countDocuments({parentId: post.id, likeStatus:"Like"})
        const countDislikes = await likeStatusCollection.countDocuments({parentId: post.id, likeStatus:"Dislike"})
        const findPostWithLikesByUserId = await likeStatusCollection.findOne({parentId: post.id, userId})
        const findNewestPost = await likeStatusCollection.find({
            parentId: post.id,
            status: 'Like'
        }, {_id:0, __v: 0 }, {sort: {_id: -1}, limit: 3})

        post.extendedLikesInfo.likesCount = countLikes
        post.extendedLikesInfo.dislikesCount = countDislikes
        post.extendedLikesInfo.newestLikes = findNewestPost

        if(findPostWithLikesByUserId){
            post.extendedLikesInfo.myStatus = findPostWithLikesByUserId.likeStatus
        } else {
            post.likesInfo.myStatus = "None"
        }

        postWithLikeStatus.push(post)
    }
    return postWithLikeStatus
}

