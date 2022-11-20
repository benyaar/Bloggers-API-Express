import {PostDBType} from "../types/types";
import {postsCollection} from "./db";

export const postsRepository = {
    async createNewPost(newPost:PostDBType) {
        return postsCollection.insertMany(newPost)
    },
    async updatePost (postId:string, title: string, shortDescription: string, content: string){
        const updatePost = await postsCollection.updateOne({id:postId}, {$set: {title, shortDescription, content}})
        return updatePost.matchedCount === 1
    },
    async deletePost (postId:string){
        const deletePost = await postsCollection.deleteOne({id:postId})
         return deletePost.deletedCount === 1
    }

}