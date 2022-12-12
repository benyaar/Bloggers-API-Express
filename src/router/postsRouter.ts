import {Router, Request, Response} from "express";
import {postsService} from "../domain/postsService";
import {queryRepository} from "../queryRepository/queryRepository";
import {basicAuthMiddleware} from "../middleware/basicAuthMiddleware";
import {
    blogIdValidation, commentsContentValidation,
    contentValidation,
    expressValidator, likeStatusValidation, paginationValidation,
    shortDescriptionPostValidation,
    titlePostValidation
} from "../middleware/expressValidator";
import {
    bearerAuthMiddleWare,
    checkBearerAuthMiddleWare,
} from "../middleware/bearerAuthMiddleWare";
import {commentsService} from "../domain/commentsService";

import {likeStatusService} from "../domain/likeStatusService";


export const postsRouter = Router({})

postsRouter.post("/", basicAuthMiddleware, blogIdValidation, titlePostValidation, shortDescriptionPostValidation, contentValidation,
    expressValidator, async (req:Request, res:Response) =>{
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId

    const findBlogById = await queryRepository.getBlogById(blogId)
    if(!findBlogById){
        return res.status(404).send({
            "errorsMessages": [
                {
                    "message": "blogId undefined",
                    "field": "createNewPost"
                }
            ]
        })
    }

    const createNewPost = await postsService.createNewPost(title, shortDescription, content, findBlogById)

    const {_id, ...createNewPostCopy} = createNewPost
    res.status(201).send(createNewPostCopy)
})
postsRouter.get("/", checkBearerAuthMiddleWare, paginationValidation, async (req:Request, res:Response) =>{
    const userId = req.user?.id
    const searchNameTerm:any = req.query.searchNameTerm
    const pageNumber:any = req.query.pageNumber
    const pageSize:any = req.query.pageSize
    const sortBy:any = req.query.sortBy
    let sortDirection = req.query.sortDirection
    if (sortDirection !== ('asc' || 'desc')) sortDirection = 'desc'

    const findPosts = await queryRepository.getAllPosts(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection, userId)
    res.status(200).send(findPosts)

})

postsRouter.get("/:id", checkBearerAuthMiddleWare, async (req:Request, res:Response) =>{
    const postId = req.params.id
    const userId = req.user?.id
    const findPostById = await queryRepository.getPostByIdWithLikes(postId, userId)

    if(!findPostById) return res.sendStatus(404)
    res.status(200).send(findPostById)
})

postsRouter.put("/:id", basicAuthMiddleware, blogIdValidation, titlePostValidation, shortDescriptionPostValidation, contentValidation,
    expressValidator, basicAuthMiddleware, async (req:Request, res:Response) =>{
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content

    const postId = req.params.id
    const findPostById = await queryRepository.getPostById(postId)
    if(!findPostById) return res.sendStatus(404)
    await postsService.updatePost(postId, title, shortDescription, content)
    res.sendStatus(204)
})

postsRouter.delete("/:id", basicAuthMiddleware, async (req:Request, res:Response) =>{
    const postId = req.params.id
    const findPostById = await queryRepository.getPostById(postId)
    if(!findPostById) return res.sendStatus(404)
    await postsService.deletePost(postId)
    res.sendStatus(204)
})

postsRouter.post('/:id/comments', bearerAuthMiddleWare, commentsContentValidation, expressValidator, async (req:Request, res:Response) => {
    const post = req.params.id
    const content = req.body.content
    const user = req.user!


    const findPostById = await queryRepository.getPostById(post)
    if(!findPostById) return res.sendStatus(404)
    const createNewComment = await commentsService.createNewComments(content, user, post)
    const {_id, postId, ...newCommentCopy} = createNewComment

    res.status(201).send(newCommentCopy)

})
postsRouter.get('/:id/comments', checkBearerAuthMiddleWare, paginationValidation, async (req:Request, res:Response) => {
    const postId = req.params.id
    const pageNumber:any = req.query.pageNumber
    const pageSize:any = req.query.pageSize
    const sortBy:any = req.query.sortBy
    let sortDirection = req.query.sortDirection
    if (sortDirection !== ('asc' || 'desc')) sortDirection = 'desc'
    const userId = req.user?.id

    const findPostById = await queryRepository.getPostById(postId)
    if(!findPostById) return res.sendStatus(404)

    const findAllCommentsByPost = await queryRepository.findAllCommentsByPost(pageNumber,pageSize, sortBy, sortDirection, postId, userId)



    res.status(200).send(findAllCommentsByPost)

})

postsRouter.put('/:postId/like-status', bearerAuthMiddleWare, likeStatusValidation, expressValidator,  async (req: Request, res: Response) => {
    const user = req.user!
    const postId = req.params.postId
    const likeStatus = req.body.likeStatus

    const getPostById = await queryRepository.getPostById(postId)
    if(!getPostById) return res.sendStatus(404)

    await likeStatusService.addLikeStatus(postId, user.id, user.login, likeStatus)


    res.sendStatus(204)
})
