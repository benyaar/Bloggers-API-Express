import {ObjectId} from "mongodb";
import {BlogDBType, PostDBType} from "../types/types";
import {postsRepository} from "../repository/postsRepository";

export const postsService = {

    async createNewPost (title: string, shortDescription: string, content: string, blogs: BlogDBType){

        const newPost: PostDBType = {
            _id: new ObjectId(),
            id: new ObjectId().toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogs.id,
            blogName: blogs.name,
        }
        await postsRepository.createNewPost(newPost)
        return newPost
    },
   async updatePost(postId: string, title: string, shortDescription: string, content: string){
        return postsRepository.updatePost(postId, title, shortDescription, content)
    },
    async deletePost(postId: string){
        return postsRepository.deletePost(postId)
    }
}