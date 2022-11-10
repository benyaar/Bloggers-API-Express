import {NextFunction, Request, Response} from "express";

export const basicAuthMiddleware = (req:Request, res: Response, next:NextFunction) => {
    if(!req.headers.authorization) return res.sendStatus(401)
    const authBasicPassword = req.headers.authorization.split(' ')[1]
    if(authBasicPassword === 'YWRtaW46cXdlcnR5'){
        next()
    }else{
        return res.sendStatus(400)
    }
}