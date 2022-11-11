import {Router, Request, Response} from "express";
import {postsService} from "../domain/postsService";
import {queryRepository} from "../queryRepository/queryRepository";
import {basicAuthMiddleware} from "../middleware/basicAuthMiddleware";
import {
    blogIdValidation,
    contentValidation,
    expressValidator,
    shortDescriptionPostValidation,
    titlePostValidation
} from "../middleware/expressValidator";


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
postsRouter.get("/", async (req:Request, res:Response) =>{
    const searchNameTerm = String(req.query.searchNameTerm)
    const pageNumber = Number(req.query.pageNumber) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const sortBy = String(req.query.sortBy) || "createdAt"
    const sortDirection = String(req.query.sortDirection) || "desc"

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
