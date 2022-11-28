import {Request, Router, Response} from "express";
import {queryRepository} from "../queryRepository/queryRepository";
import {userSessionsService} from "../domain/userSessionsService";
import {checkRefreshTokenMiddleWare} from "../middleware/checkRefreshTokenMiddleWare";
import {JWTService} from "../domain/JWTService";

export const userSessionsRouter = Router({})

userSessionsRouter.get('/devices', checkRefreshTokenMiddleWare, async (req:Request, res:Response)=> {
   const refreshToken =  req.cookies.refreshToken



    const getDataFromToken = await JWTService.getDataByToken(refreshToken)

    console.log(getDataFromToken)
    const userId = getDataFromToken.userId

    const getSessionByUserId = await queryRepository.getSessionByUserId(userId)
    res.status(200).send(getSessionByUserId)
})


userSessionsRouter.delete('/devices', checkRefreshTokenMiddleWare, async(req:Request, res:Response) =>{
    const refreshToken =  req.cookies.refreshToken
    const getDataFromToken = await JWTService.getDataByToken(refreshToken)
    const userId = getDataFromToken.userId
    const deviceId = getDataFromToken.deviceId

    await JWTService.addRefreshTokenInBlackList(refreshToken)
    await userSessionsService.deleteAllDevice(userId, deviceId)
    res.sendStatus(204)
})

userSessionsRouter.delete('/devices/:deviceId', checkRefreshTokenMiddleWare, async(req:Request, res:Response) =>{
    const deviceId = req.params.deviceId
    const refreshToken =  req.cookies.refreshToken

    const findDeviceByDeviceId = await queryRepository.findDeviceByDeviceId(deviceId)
    if(!findDeviceByDeviceId) return  res.sendStatus(404)

    const getDataFromToken = await JWTService.getDataByToken(refreshToken)
    const userId = getDataFromToken.userId
    const findDeviceIdFromUserId = await queryRepository.findDeviceByUseId(userId)
    if(!findDeviceIdFromUserId) return res.sendStatus(404)
    if(findDeviceByDeviceId.userId !== userId) return res.sendStatus(403)


    await userSessionsService.deleteDeviceByDeviceId(userId, deviceId)
    res.sendStatus(204)
})

