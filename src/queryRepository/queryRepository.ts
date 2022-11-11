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
    async getAllBlogs (searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:string) {

       const findAndSortedBlogs =  await bloggersCollection
           .find({name: {$regex: searchNameTerm}}, options)
           .sort(JSON.parse(sortBy),JSON.parse(sortDirection))
           .skip((pageNumber - 1) * pageSize)
           .limit(pageSize)
           .toArray()
        const getCountBlogs = await bloggersCollection.countDocuments()
        return {
            "pagesCount": Math.ceil(getCountBlogs/pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": getCountBlogs,
            "items": findAndSortedBlogs
        }
    },
    async getBlogById(id: string) {
        return bloggersCollection.findOne({id}, options)
    },
    async getAllPosts (searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:string) {
        const findAndSortedPosts =  await postsCollection
            .find({name: {$regex: searchNameTerm}}, options)
            .sort(JSON.parse(sortBy),JSON.parse(sortDirection))
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountPosts = await postsCollection.countDocuments()
        return {
            "pagesCount": Math.ceil(getCountPosts/pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": getCountPosts,
            "items": findAndSortedPosts
        }

    },
    async getPostById (id:string) {
        return postsCollection.findOne({id}, options)
    },
    async findBlogPosts (id:string, searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:string, sortDirection:string  ) {
        const findAndSortedPosts =  await postsCollection
            .find({name: {$regex: searchNameTerm}, blogId:id}, options)
            .sort(JSON.parse(sortBy),JSON.parse(sortDirection))
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountPosts = await postsCollection.countDocuments()
        return {
            "pagesCount": Math.ceil(getCountPosts/pageSize),
            "page": pageNumber,
            "pageSize": pageSize,
            "totalCount": getCountPosts,
            "items": findAndSortedPosts
        }
    }
}