import {Response, Request, Router} from "express";
import {queryRepository} from "../queryRepository/queryRepository";
import {bearerAuthMiddleWare} from "../middleware/bearerAuthMiddleWare";
import {contentValidation, expressValidator} from "../middleware/expressValidator";
import {commentsService} from "../domain/commentsService";


export const  commentsRouter = Router({})

commentsRouter.get('/:id', async (req:Request, res:Response) => {
    const commentId = req.params.id
    const getCommentById = await queryRepository.getCommentById(commentId)
    if(!getCommentById) return res.sendStatus(404)
    res.status(200).send(getCommentById)
})

commentsRouter.put('/:id',bearerAuthMiddleWare, contentValidation, expressValidator, async (req:Request, res:Response) => {
    const user = req.user!
    const commentId = req.params.id
    const content = req.body.content
    const getCommentById = await queryRepository.getCommentById(commentId)
    if(!getCommentById) return res.sendStatus(404)

    const updateComment = await commentsService.updateComment(commentId, content, user)
    if(!updateComment) return res.sendStatus(404)
    res.sendStatus(204)

})

commentsRouter.delete('/:id',bearerAuthMiddleWare, async (req:Request, res:Response) => {
    const user = req.user!
    const commentId = req.params.id

    const getCommentById = await queryRepository.getCommentById(commentId)
    if(!getCommentById) return res.sendStatus(404)

    const deleteComment = await commentsService.deleteComment(commentId, user)
    if(!deleteComment) return res.sendStatus(404)
    res.sendStatus(204)
})