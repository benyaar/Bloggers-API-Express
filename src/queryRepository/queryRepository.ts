import {bloggersCollection, postsCollection, videosCollection} from "../repository/db";
import {paginationResult} from "../helpers/pagination";


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
    async getAllBlogs (searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:any, sortDirection: any) {

       const findAndSortedBlogs =  await bloggersCollection
           .find({name: { $regex : searchNameTerm , $options : "i"}}, options)
           .sort(sortBy, sortDirection)
           .skip((pageNumber - 1) * pageSize)
           .limit(pageSize)
           .toArray()

        const getCountBlogs = await bloggersCollection.countDocuments({ $regex : searchNameTerm , $options : "i"})
        return paginationResult(pageNumber, pageSize, getCountBlogs, findAndSortedBlogs)
    },

    async getBlogById(id: string) {
        return bloggersCollection.findOne({id}, options)
    },
    async getAllPosts (searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:any, sortDirection:any) {
        const findAndSortedPosts =  await postsCollection
            .find({title: {$regex: searchNameTerm}}, options)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountPosts = await postsCollection.countDocuments()
        return paginationResult(pageNumber, pageSize, getCountPosts, findAndSortedPosts)

    },
    async getPostById (id:string) {
        return postsCollection.findOne({id}, options)
    },
    async findBlogPosts (id:string, searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:any, sortDirection:any  ) {
        const findAndSortedPosts = await postsCollection
            .find({ title: { $regex : searchNameTerm , $options : "i"}, blogId: id}, options)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountPosts = await postsCollection.countDocuments({ title: { $regex : searchNameTerm , $options : "i"}, blogId: id})
        return paginationResult(pageNumber, pageSize, getCountPosts, findAndSortedPosts)
    }


}