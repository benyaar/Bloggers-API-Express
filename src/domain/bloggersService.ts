import {BlogDBType} from "../types/types";
import {bloggersRepository} from "../repository/bloggersRepository";
import {ObjectId} from "mongodb";
import {postsService} from "./postsService";

export const bloggersService = {
   async createNewBlog (name: string, description: string, websiteUrl: string) {
        const newBlogger:BlogDBType = {
            _id: new ObjectId(),
            id: new ObjectId().toString(),
            name,
            description,
            websiteUrl,
            createdAt: new Date(),
        }
        await bloggersRepository.createNewBlog(newBlogger)
        return newBlogger
    },
    async updateBlog(blogId:string, name: string, description:string, websiteUrl: string){
       return bloggersRepository.updateBlog(blogId, name, description, websiteUrl)
    },
    async deleteBlog(blogId: string){
       return bloggersRepository.deleteBlog(blogId)
    },
    async createNewBlogPosts (title: string, shortDescription: string, content: string, findBlog: BlogDBType){
       return postsService.createNewPost(title, shortDescription, content, findBlog)

    },

}