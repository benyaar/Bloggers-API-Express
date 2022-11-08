import {BlogDBType} from "../types/types";
import {bloggersCollection} from "./db";

export const bloggersRepository = {
    async createNewBlog (newBlog: BlogDBType) {
        return bloggersCollection.insertOne(newBlog)
    }
}