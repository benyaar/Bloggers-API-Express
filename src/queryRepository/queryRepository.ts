import {
    bloggersCollection,
    commentsCollection,
    postsCollection,
    usersCollection,
    videosCollection
} from "../repository/db";
import {paginationResult} from "../helpers/pagination";



const options = {
    projection: {
        _id:0,
        passwordHash: 0,
        postId: 0,
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

        const getCountBlogs = await bloggersCollection.countDocuments({name: { $regex : searchNameTerm , $options : "i"}})
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
    },

    async getAllUsers(pageNumber:number, pageSize:number, sortBy:any, sortDirection:any,
                      searchLoginTerm:string, searchEmailTerm:string){
        const findAndSortedUsers = await usersCollection
            .find({$or : [{login: { $regex : searchLoginTerm , $options : "i"}}, {email: { $regex : searchEmailTerm , $options : "i"}}]}, options)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountUsers = await usersCollection.countDocuments({$or : [{login: { $regex : searchLoginTerm , $options : "i"}}, {email: { $regex : searchEmailTerm , $options : "i"}}]})
        return paginationResult(pageNumber, pageSize, getCountUsers, findAndSortedUsers)
    },
    async findUserById (id: string){
        return usersCollection.findOne({id})
    },
    async findUserByLogin (login: string){
        return usersCollection.findOne({login})
    },
    async findUserByLoginOrEmail(login:string, email: string){
        return usersCollection.findOne(({$or : [{login}, {email}]}))
    },
    async findAllCommentsByPost (pageNumber:number, pageSize:number, sortBy:any, sortDirection:any, postId: string){
        const findAndSortedComments = await commentsCollection
            .find({postId}, options)
            .sort(sortBy, sortDirection)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .toArray()
        const getCountUsers = await commentsCollection.countDocuments({postId})
        return paginationResult(pageNumber, pageSize, getCountUsers, findAndSortedComments)
    },
    async getCommentById(id: string){
        return commentsCollection.findOne({id})
    }

}