import {Router, Request, Response} from "express";
import {videosService} from "../domain/videosService";
import {queryRepository} from "../queryRepository/queryRepository";
import {
    authorValidation, availableResolutionsValidation,
    expressValidator,
    titleValidation
} from "../middleware/expressValidator";

export const videosRouter = Router({})

videosRouter.post('/', titleValidation, authorValidation, availableResolutionsValidation, expressValidator, async (req:Request, res:Response)=>{
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions


    const createNewVideo = await videosService.createNewVideo(title, author, availableResolutions)

    res.status(201).send(createNewVideo)
})

videosRouter.get('/', async (req:Request, res:Response)=>{
    const getAllVideos = await queryRepository.getAllVideos()
    res.status(200).send(getAllVideos)

})

videosRouter.get('/:id', async (req:Request, res:Response)=>{
    const videoId = +req.params.id
    const getVideoById = await queryRepository.getVideoById(videoId)
    if(!getVideoById) return  res.sendStatus(404)
    res.status(200).send(getVideoById)
})

videosRouter.put('/:id', titleValidation, authorValidation, availableResolutionsValidation, expressValidator, async (req:Request, res:Response)=>{
    const title = req.body.title
    const author = req.body.author
    const availableResolutions = req.body.availableResolutions
    const canBeDownloaded = req.body.canBeDownloaded
    const minAgeRestriction = req.body.minAgeRestriction
    const publicationDate = req.body.publicationDate

    const videoId = +req.params.id
    const getVideoById = await queryRepository.getVideoById(videoId)
    if(!getVideoById) return  res.sendStatus(404)
    await videosService.updateVideo(videoId, title, author, availableResolutions, canBeDownloaded, minAgeRestriction, publicationDate)

    res.sendStatus(204)
})

videosRouter.delete('/:id', async (req:Request, res:Response)=>{
    const videoId = +req.params.id
    const getVideoById = await queryRepository.getVideoById(videoId)
    if(!getVideoById) return res.sendStatus(404)
    await videosService.deleteVideo(videoId)
    res.status(204).send(getVideoById)
})


