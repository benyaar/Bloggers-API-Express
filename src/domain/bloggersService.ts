import {BlogDBType} from "../types/types";
import {bloggersRepository} from "../repository/bloggersRepository";

export const bloggersService = {
   async createNewBlog (name: string, youtubeUrl: string) {
        const newBlogger:BlogDBType = {
            id: + new Date(),
            name: name,
            youtubeUrl:youtubeUrl
        }
        await bloggersRepository.createNewBlog(newBlogger)
        return newBlogger
    }


}