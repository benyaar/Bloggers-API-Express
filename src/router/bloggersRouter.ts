import {Router, Request, Response} from "express";
import {bloggersService} from "../domain/bloggersService";
import {queryRepository} from "../queryRepository/queryRepository";
import {
    contentValidation,
    expressValidator,
    nameBlogValidation, shortDescriptionPostValidation,
    titlePostValidation,
    youtubeUrlValidation
} from "../middleware/expressValidator";
import {basicAuthMiddleware} from "../middleware/basicAuthMiddleware";



export const bloggersRouter = Router({})

bloggersRouter.post("/", basicAuthMiddleware, nameBlogValidation, youtubeUrlValidation, expressValidator, async (req:Request, res:Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.youtubeUrl

    const createNewBlog = await bloggersService.createNewBlog(name, youtubeUrl)

    const {_id, ...createNewBlogCopy} = createNewBlog
    res.status(201).send(createNewBlogCopy)
})

bloggersRouter.get("/", async (req:Request, res:Response) => {
    const searchNameTerm = String(req.query.searchNameTerm)
    const pageNumber = Number(req.query.pageNumber) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const sortBy = String(req.query.sortBy) || "createdAt"
    const sortDirection = String(req.query.sortDirection) || "desc"


    const getAllBlogs = await queryRepository.getAllBlogs(searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    res.status(200).send(getAllBlogs)
})

bloggersRouter.get('/:id', async (req:Request, res:Response)=>{
    const blogId = req.params.id
    const getBlogById = await queryRepository.getBlogById(blogId)
    if(!getBlogById) return  res.sendStatus(404)
    res.status(200).send(getBlogById)
})

bloggersRouter.put('/:id', basicAuthMiddleware, nameBlogValidation, youtubeUrlValidation, expressValidator, async (req:Request, res:Response)=>{
        const name = req.body.name
        const youtubeUrl = req.body.youtubeUrl

        const blogId = req.params.id
        const getBlogById = await queryRepository.getBlogById(blogId)
        if(!getBlogById) return  res.sendStatus(404)
        await bloggersService.updateBlog(blogId, name, youtubeUrl)

        res.sendStatus(204)
    })

bloggersRouter.delete('/:id',basicAuthMiddleware,  async (req:Request, res:Response)=>{
    const blogId = req.params.id
    const getBlogById = await queryRepository.getBlogById(blogId)
    if(!getBlogById) return res.sendStatus(404)
    await bloggersService.deleteBlog(blogId)
    res.sendStatus(204)
})

bloggersRouter.post('/:id/posts',basicAuthMiddleware, titlePostValidation, shortDescriptionPostValidation, contentValidation, expressValidator,  async (req:Request, res:Response)=>{
    const blogId = req.params.id
    const title = req.body.title
    const shortDescription = req.body.shortDescription
    const content = req.body.content

    const findBlog = await queryRepository.getBlogById(blogId)
    if(!findBlog) return res.sendStatus(404)

   const newCreatePost = await bloggersService.createNewBlogPosts(title, shortDescription, content, findBlog)
    res.status(201).send(newCreatePost)
})

bloggersRouter.get('/:id/posts', async (req:Request, res:Response) => {
    const blogId = req.params.id
    const searchNameTerm = String(req.query.searchNameTerm)
    const pageNumber = Number(req.query.pageNumber) || 1
    const pageSize = Number(req.query.pageSize) || 10
    const sortBy = String(req.query.sortBy) || "createdAt"
    const sortDirection = String(req.query.sortDirection) || "desc"

    const findBlog = await queryRepository.getBlogById(blogId)
    if(!findBlog) return res.sendStatus(404)

    const findBlogPosts = queryRepository.findBlogPosts(blogId, searchNameTerm, pageNumber, pageSize, sortBy, sortDirection)
    res.status(200).send(findBlogPosts)
})
