import {NextFunction, Response, Request} from "express";
import {queryRepository} from "../queryRepository/queryRepository";
import {JWTService} from "../domain/JWTService";

export const checkRefreshTokenMiddleWare = async (req: Request, res:Response, next:NextFunction) => {
    const refreshToken = req.cookies.refreshToken
    if (!refreshToken) return res.sendStatus(404)

    const checkVerifyToken = await JWTService.getDataByToken(refreshToken)
    if(!checkVerifyToken) return res.sendStatus(404)

    const tokenTime = checkVerifyToken.exp
    if (!tokenTime) return res.sendStatus(404)

    const findUserIdByToken = checkVerifyToken.userId
    if (!findUserIdByToken) return res.sendStatus(404)

    const findUserById = await queryRepository.findUserById(findUserIdByToken)
    if (!findUserById) return res.sendStatus(404)

    const findTokenInBlackList = await queryRepository.findTokenInBlackList(refreshToken)
    if (findTokenInBlackList) return res.sendStatus(404)

    const deviceId = checkVerifyToken.deviceId
    const findDeviceByDeviceId = await queryRepository.findDeviceById(deviceId)
    if(!findDeviceByDeviceId) return res.sendStatus(401)
    if (findUserById.id !== findDeviceByDeviceId.userId) return res.sendStatus(403)

    next()
}
