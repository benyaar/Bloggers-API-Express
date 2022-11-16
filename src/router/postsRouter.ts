import {Router, Request, Response} from "express";
import {postsService} from "../domain/postsService";
import {queryRepository} from "../queryRepository/queryRepository";
import {basicAuthMiddleware} from "../middleware/basicAuthMiddleware";
import {
    blogIdValidation, commentsContentValidation,
    contentValidation,
    expressValidator, paginationValidation,
    shortDescriptionPostValidation,
    titlePostValidation
} from "../middleware/expressValidator";
import {bearerAuthMiddleWare} from "../middleware/bearerAuthMiddleWare";
import {commentsService} from "../domain/commentsService";


export const postsRouter = Router({})

postsRouter.post("/", basicAuthMiddleware, blogIdValidation, titlePostValidation, shortDescriptionPostValidation, contentValidation,
    expressValidator, async (req:Request, res:Response) =>{
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content
    const blogId = req.body.blogId
        const user = req.user?.login
        console.log(user)

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
postsRouter.get("/", paginationValidation, async (req:Request, res:Response) =>{
    const searchNameTerm:any = req.query.searchNameTerm
    const pageNumber:any = req.query.pageNumber
    const pageSize:any = req.query.pageSize
    const sortBy:any = req.query.sortBy
    let sortDirection = req.query.sortDirection
    if (sortDirection !== ('asc' || 'desc')) sortDirection = 'desc'

    const findPosts = await queryRepository.getAllPosts(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    res.status(200).send(findPosts)

})

postsRouter.get("/:id", async (req:Request, res:Response) =>{
    const postId = req.params.id
    const findPostById = await queryRepository.getPostById(postId)
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
postsRouter.get('/:id/comments', paginationValidation, async (req:Request, res:Response) => {
    const postId = req.params.id
    const pageNumber:any = req.query.pageNumber
    const pageSize:any = req.query.pageSize
    const sortBy:any = req.query.sortBy
    let sortDirection = req.query.sortDirection
    if (sortDirection !== ('asc' || 'desc')) sortDirection = 'desc'

    const findPostById = await queryRepository.getPostById(postId)
    if(!findPostById) return res.sendStatus(404)

    const findAllCommentsByPost = await queryRepository.findAllCommentsByPost(pageNumber,pageSize, sortBy, sortDirection, postId)


    res.status(200).send(findAllCommentsByPost)

})