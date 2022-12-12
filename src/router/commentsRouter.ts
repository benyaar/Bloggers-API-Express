import {Response, Request, Router} from "express";
import {queryRepository} from "../queryRepository/queryRepository";
import {bearerAuthMiddleWare, checkBearerAuthMiddleWare} from "../middleware/bearerAuthMiddleWare";
import {commentsContentValidation, expressValidator, likeStatusValidation} from "../middleware/expressValidator";
import {commentsService} from "../domain/commentsService";
import {likeStatusService} from "../domain/likeStatusService";



export const  commentsRouter = Router({})

commentsRouter.get('/:commentId', checkBearerAuthMiddleWare, async (req:Request, res:Response) => {
    const commentId = req.params.commentId
    const userId = req.user?.id
    const getCommentById = await queryRepository.getCommentByIdWithLikes(commentId, userId )
    if(!getCommentById) return res.sendStatus(404)
    res.status(200).send(getCommentById)
})

commentsRouter.put('/:commentId',bearerAuthMiddleWare, commentsContentValidation, expressValidator, async (req:Request, res:Response) => {
    const user = req.user!
    const commentId = req.params.commentId
    const content = req.body.content
    const getCommentById = await queryRepository.getCommentById(commentId)
    if(!getCommentById) return res.sendStatus(404)

    const updateComment = await commentsService.updateComment(commentId, content, user)
    if(!updateComment) return res.sendStatus(403)
    res.sendStatus(204)

})

commentsRouter.delete('/:commentId',bearerAuthMiddleWare, async (req:Request, res:Response) => {
    const user = req.user!
    const commentId = req.params.commentId

    const getCommentById = await queryRepository.getCommentById(commentId)
    if(!getCommentById) return res.sendStatus(404)

    const deleteComment = await commentsService.deleteComment(commentId, user)
    if(!deleteComment) return res.sendStatus(403)
    res.sendStatus(204)
})

commentsRouter.put('/:commentId/like-status', bearerAuthMiddleWare, likeStatusValidation, expressValidator,  async (req: Request, res: Response) => {
    const user = req.user!
    const commentId = req.params.commentId
    const likeStatus = req.body.likeStatus

    const getCommentById = await queryRepository.getCommentById(commentId)
    if(!getCommentById) return res.sendStatus(404)

    await likeStatusService.addLikeStatus(commentId, user.id, user.login, likeStatus)


    res.sendStatus(204)
})