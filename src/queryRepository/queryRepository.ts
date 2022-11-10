import {bloggersCollection, postsCollection, videosCollection} from "../repository/db";

const options = {
    projection: {
        _id:0
    }
}

export const queryRepository = {
    async getAllVideos () {
        return videosCollection.find({}, options).toArray()
    },
    async getVideoById(id: number) {
        return videosCollection.findOne({id}, options)
    },
    async getAllBlogs () {
        return bloggersCollection.find({}, options).toArray()
    },
    async getBlogById(id: string) {
        return bloggersCollection.findOne({id}, options)
    },
    async getAllPosts () {
        return postsCollection.find({}, options).toArray()
    },
    async getPostById (id:string) {
        return postsCollection.findOne({id}, options)
    },

}