import {BlogDBType} from "../types/types";
import {bloggersRepository} from "../repository/bloggersRepository";
import {ObjectId} from "mongodb";

export const bloggersService = {
   async createNewBlog (name: string, youtubeUrl: string) {
        const newBlogger:BlogDBType = {
            _id: new ObjectId(),
            id: new ObjectId().toString(),
            name: name,
            youtubeUrl:youtubeUrl,
            createAt: new Date()
        }
        await bloggersRepository.createNewBlog(newBlogger)
        return newBlogger
    },
    async updateBlog(blogId:string, name: string, youtubeUrl:string){
       return bloggersRepository.updateBlog(blogId, name, youtubeUrl)
    },
    async deleteBlog(blogId: string){
       return bloggersRepository.deleteBlog(blogId)
    }


}