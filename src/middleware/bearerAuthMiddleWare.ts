import {Response, Request, NextFunction} from "express";
import {JWTService} from "../domain/JWTService";
import {queryRepository} from "../queryRepository/queryRepository";




export const bearerAuthMiddleWare = async (req: Request, res:Response, next:NextFunction) => {
    if(!req.headers.authorization) return res.sendStatus(401)
    const token = req.headers.authorization.split(' ')[1]
    const getUserByToken = await JWTService.getUseIdByToken(token)
    if(!getUserByToken) return res.sendStatus(401)
    req.user = await queryRepository.findUserById(getUserByToken)

    return  next()
}