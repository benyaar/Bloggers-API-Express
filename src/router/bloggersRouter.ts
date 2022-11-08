import {Router, Request, Response} from "express";
import {bloggersService} from "../domain/bloggersService";

export const bloggersRouter = Router({})

bloggersRouter.post("/", async (req:Request, res:Response) => {
    const name = req.body.name
    const youtubeUrl = req.body.url
    const createNewBlogger = await bloggersService.createNewBlog(name, youtubeUrl)
    res.status(201).send(createNewBlogger)
})