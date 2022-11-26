import {Request, Router, Response} from "express";
import {queryRepository} from "../queryRepository/queryRepository";
import {userSessionsService} from "../domain/userSessionsService";
import {checkRefreshTokenMiddleWare} from "../middleware/checkRefreshTokenMiddleWare";

export const userSessionsRouter = Router({})

userSessionsRouter.get('/devices', checkRefreshTokenMiddleWare, async (req:Request, res:Response)=> {
   const refreshToken =  req.cookies.refreshToken

    const getSessionByDevices = await queryRepository.getSessionByDevices(refreshToken.userId)
    res.status(200).send(getSessionByDevices)

})

userSessionsRouter.delete('/devices', checkRefreshTokenMiddleWare, async(req:Request, res:Response) =>{
    const refreshToken =  req.cookies.refreshToken

    await userSessionsService.deleteAllDevice(refreshToken.userId)
    res.sendStatus(204)
})

userSessionsRouter.delete('/devices/:deviceId', checkRefreshTokenMiddleWare, async(req:Request, res:Response) =>{
    const deviceId = req.params.deviceId
    const refreshToken =  req.cookies.refreshToken


    // const getDataFromToken = await JWTService.getDataByToken(refreshToken)
    // const userId = getDataFromToken.userId

    await userSessionsService.deleteDeviceByDeviceId(refreshToken.userId, deviceId)
    res.sendStatus(204)

})

