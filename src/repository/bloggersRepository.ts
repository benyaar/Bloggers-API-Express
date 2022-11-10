import {BlogDBType} from "../types/types";
import {bloggersCollection} from "./db";



export const bloggersRepository = {
    async createNewBlog (newBlog: BlogDBType) {
        return bloggersCollection.insertOne(newBlog)
    },
    async updateBlog(blogId: string, name: string, youtubeUrl: string){
        const updateBlog = await bloggersCollection.updateOne({id: blogId}, {$set:{name: name, youtubeUrl: youtubeUrl}})
        return updateBlog.matchedCount === 1
    },
    async deleteBlog(blogId: string){
        const deleteBlog = await bloggersCollection.deleteOne({id: blogId})
        return deleteBlog.deletedCount === 1
    }
}
