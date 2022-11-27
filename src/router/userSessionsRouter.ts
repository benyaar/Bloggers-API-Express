import {Request, Router, Response} from "express";
import {queryRepository} from "../queryRepository/queryRepository";
import {userSessionsService} from "../domain/userSessionsService";
import {checkRefreshTokenMiddleWare} from "../middleware/checkRefreshTokenMiddleWare";
import {JWTService} from "../domain/JWTService";

export const userSessionsRouter = Router({})

userSessionsRouter.get('/devices', checkRefreshTokenMiddleWare, async (req:Request, res:Response)=> {
   const refreshToken =  req.cookies.refreshToken


    const getDataFromToken = await JWTService.getDataByToken(refreshToken)
    const userId = getDataFromToken.userId

    const getSessionByDevices = await queryRepository.getSessionByDevices(userId)
    res.status(200).send(getSessionByDevices)
})


userSessionsRouter.delete('/devices', checkRefreshTokenMiddleWare, async(req:Request, res:Response) =>{
    const refreshToken =  req.cookies.refreshToken
    const getDataFromToken = await JWTService.getDataByToken(refreshToken)
    const userId = getDataFromToken.userId

    await userSessionsService.deleteAllDevice(userId)
    res.sendStatus(204)
})

userSessionsRouter.delete('/devices/:deviceId', checkRefreshTokenMiddleWare, async(req:Request, res:Response) =>{
    const deviceId = req.params.deviceId
    const refreshToken =  req.cookies.refreshToken

    const getDataFromToken = await JWTService.getDataByToken(refreshToken)
    const userId = getDataFromToken.userId
    const findDeviceIdFromUserId = await queryRepository.findDeviceByUseId(userId)
    if(!findDeviceIdFromUserId) return res.sendStatus(404)

    if(findDeviceIdFromUserId.deviceId !== deviceId) return res.sendStatus(403)

    await userSessionsService.deleteDeviceByDeviceId(userId, deviceId)
    res.sendStatus(204)
})

