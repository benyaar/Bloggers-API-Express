import {Router, Request, Response} from "express";
import {bloggersService} from "../domain/bloggersService";
import {queryRepository} from "../queryRepository/queryRepository";
import {expressValidator, nameBlogValidation, youtubeUrlValidation} from "../middleware/expressValidator";
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
    const getAllBlogs = await queryRepository.getAllBlogs()
    res.status(201).send(getAllBlogs)
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
