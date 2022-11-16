import {Request, Response, Router} from "express";
import {loginInputValidation } from "../middleware/expressValidator";
import {authService} from "../domain/authService";
import {bearerAuthMiddleWare} from "../middleware/bearerAuthMiddleWare";
import {queryRepository} from "../queryRepository/queryRepository";
import {UserAboutInfoType} from "../types/types";

export const authRouter = Router({})

authRouter.post('/login', loginInputValidation, async (req:Request, res:Response) =>{
    const login = req.body.login
    const password = req.body.password

    const loginUser = await authService.loginUser(login, password)
    console.log(loginUser)
    if(!loginUser) return res.sendStatus(401)


    res.status(204).send({'accessToken': loginUser})
})
authRouter.get('/me', bearerAuthMiddleWare, async (req:Request, res:Response) =>{
    const user = req.user!.id
    const userInfo = await queryRepository.findUserById(user)
    if(!userInfo) return res.status(404)
    const userAbout: UserAboutInfoType = {
        email: userInfo?.email,
        login: userInfo?.login,
        userId: userInfo?.id,
    }

    res.status(200).send(userAbout)
})