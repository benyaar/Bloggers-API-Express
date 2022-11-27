import {
    bloggersCollection,
    commentsCollection,
    postsCollection, tokenBlackListCollection,
    usersCollection, usersSessionsCollection,
    videosCollection
} from "../repository/db";
import {paginationResult} from "../helpers/pagination";

const options = {
        _id:0,
        passwordHash:0,
        postId:0,
        emailConfirmation:0,
        __v:0
}

const optionsForUserSessions ={
    _id:0,
    __v:0,
    userId:0
}
export const queryRepository = {
    async getAllVideos () {
        return videosCollection.find({}, options)
    },
    async getVideoById(id: number) {
        return videosCollection.findOne({id}, options)
    },
    async getAllBlogs (searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:any, sortDirection: any) {

       const findAndSortedBlogs =  await bloggersCollection
           .find({name: { $regex : searchNameTerm , $options : "i"}}, options).lean()
           .sort({[sortBy]: sortDirection})
           .skip((pageNumber - 1) * pageSize)
           .limit(pageSize)
        const getCountBlogs = await bloggersCollection.countDocuments({name: { $regex : searchNameTerm , $options : "i"}})
        return paginationResult(pageNumber, pageSize, getCountBlogs, findAndSortedBlogs)
    },

    async getBlogById(id: string) {
        return bloggersCollection.findOne({id}, options)
    },
    async getAllPosts (searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:any, sortDirection:any) {
        const findAndSortedPosts =  await postsCollection
            .find({title: {$regex: searchNameTerm}}, options)
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)

        const getCountPosts = await postsCollection.countDocuments()
        return paginationResult(pageNumber, pageSize, getCountPosts, findAndSortedPosts)
    },
    async getPostById (id:string) {
        return postsCollection.findOne({id}, options)
    },
    async findBlogPosts (id:string, searchNameTerm: string, pageNumber:number, pageSize:number, sortBy:any, sortDirection:any  ) {
        const findAndSortedPosts = await postsCollection
            .find({ title: { $regex : searchNameTerm , $options : "i"}, blogId: id}, options)
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
        const getCountPosts = await postsCollection.countDocuments({ title: { $regex : searchNameTerm , $options : "i"}, blogId: id})
        return paginationResult(pageNumber, pageSize, getCountPosts, findAndSortedPosts)
    },

    async getAllUsers(pageNumber:number, pageSize:number, sortBy:any, sortDirection:any,
                      searchLoginTerm:string, searchEmailTerm:string){
        const findAndSortedUsers = await usersCollection
            .find({$or : [{login: { $regex : searchLoginTerm , $options : "i"}}, {email: { $regex : searchEmailTerm , $options : "i"}}]}, options)
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize).lean()
        const getCountUsers = await usersCollection.countDocuments({$or : [{login: { $regex : searchLoginTerm , $options : "i"}}, {email: { $regex : searchEmailTerm , $options : "i"}}]})
        return paginationResult(pageNumber, pageSize, getCountUsers, findAndSortedUsers)
    },
    async findUserById (id: string){
        return usersCollection.findOne({id})
    },
    async findUserByLogin (login: string){
        return usersCollection.findOne({login})
    },
    async findUserByLoginOrEmail(loginOrEmail:string){
        return usersCollection.findOne(({$or : [{login:loginOrEmail}, {email: loginOrEmail}]}))
    },
    async findAllCommentsByPost (pageNumber:number, pageSize:number, sortBy:any, sortDirection:any, postId: string){
        const findAndSortedComments = await commentsCollection
            .find({postId}, options)
            .sort({[sortBy]: sortDirection})
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
        const getCountUsers = await commentsCollection.countDocuments({postId})
        return paginationResult(pageNumber, pageSize, getCountUsers, findAndSortedComments)
    },
    async getCommentById(id: string){
        return commentsCollection.findOne({id}, options)
    },
    async findUserByCode(code:string){
        return usersCollection.findOne({'emailConfirmation.confirmationCode':code})
    },
    async findUserByEmail(email:string){
        return usersCollection.findOne({email})
    },
    async findTokenInBlackList(refreshToken: string){
        return tokenBlackListCollection.findOne({refreshToken})
    },
    async getSessionByUserId(userId:string){
        return usersSessionsCollection.find({userId},optionsForUserSessions)
    },
    async findDeviceById(deviceId: string) {
        return usersSessionsCollection.findOne({deviceId}, options)
    },
    async findDeviceByUseId(userId:string){
        return usersSessionsCollection.findOne({userId})
    }


}