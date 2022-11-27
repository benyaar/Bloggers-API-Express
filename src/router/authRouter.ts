import {Request, Response, Router} from "express";
import {
    emailValidation,
    expressValidator,
    registrationValidation
} from "../middleware/expressValidator";
import {authService} from "../domain/authService";
import {bearerAuthMiddleWare} from "../middleware/bearerAuthMiddleWare";
import {queryRepository} from "../queryRepository/queryRepository";
import {UserAboutInfoType} from "../types/types";
import {usersService} from "../domain/usersService";
import {attemptsMiddleware} from "../middleware/attempsMiddleware";
import {JWTService} from "../domain/JWTService";
import {userSessionsService} from "../domain/userSessionsService";
import {checkRefreshTokenMiddleWare} from "../middleware/checkRefreshTokenMiddleWare";

export const authRouter = Router({})

authRouter.post('/login', attemptsMiddleware, async (req:Request, res:Response) =>{
    const loginOrEmail = req.body.loginOrEmail
    const password = req.body.password
    const ip = req.ip
    const title = req.headers['user-agent'] || "browser not found"
    const loginUser = await authService.loginUser(loginOrEmail, password, ip, title)

    if(!loginUser) return res.sendStatus(401)
    res.cookie('refreshToken', loginUser.refreshToken, {httpOnly:true, secure: true})
    res.status(200).send({'accessToken': loginUser.accessToken, 'refresh': loginUser.refreshToken})
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

authRouter.post('/registration', attemptsMiddleware, registrationValidation, async (req: Request, res: Response) => {
    const login = req.body.login
    const password = req.body.password
    const email = req.body.email

    const findUserBuLoginOrEmail = await queryRepository.findUserByLoginOrEmail(login)
    if(findUserBuLoginOrEmail?.login === login){
        return res.status(400).send({errorsMessages: [{message: 'Invalid login', field: "login"}]})
    }
    if(findUserBuLoginOrEmail?.email === email){
        return res.status(400).send({errorsMessages: [{message: 'Invalid email', field: "email"}]})
    }

    const createNewUser = await usersService.createNewUser(login, email, password)
    if(!createNewUser) return res.sendStatus(404)
    res.sendStatus(204)
})

authRouter.post('/registration-confirmation', attemptsMiddleware, async (req:Request, res:Response)=>{
    const error = { errorsMessages: [{ message: 'code', field: "code" }]}
    const confirmationCode = req.body.code
    const findUserByCode = await queryRepository.findUserByCode(confirmationCode)
    if(!findUserByCode) return res.status(400).send(error)
    if(findUserByCode.emailConfirmation.isConfirmed)  return res.status(400).send(error)
    await authService.confirmEmail(confirmationCode, findUserByCode)
    res.sendStatus(204)
})

authRouter.post('/registration-email-resending', attemptsMiddleware, emailValidation, expressValidator, async(req:Request, res:Response) =>{
    const email = req.body.email
    const findUserByEmail = await queryRepository.findUserByEmail(email)
    if(findUserByEmail === null || !findUserByEmail || findUserByEmail.emailConfirmation.isConfirmed){
        return res.status(400).send({errorsMessages: [{message: "ErrorMessage", field: "email"}]})
    } else {
        await authService.resendingEmail(email, findUserByEmail)
        return res.sendStatus(204)
    }
})

authRouter.post('/refresh-token', checkRefreshTokenMiddleWare, async (req:Request, res: Response)=>{
    const refreshToken = req.cookies.refreshToken
    const ip = req.ip
    const title = req.headers['user-agent'] || "browser not found"

    await JWTService.addRefreshTokenInBlackList(refreshToken)
    const getTokenData = await JWTService.getDataByToken(refreshToken)


   const createNewTokenPair = await JWTService.createJWTPair(getTokenData.userId, getTokenData.deviceId)
    //const createNewTokenPair = await JWTService.createJWTPair(refreshToken.userId, refreshToken.deviceId)
    const newTokenVerify = await JWTService.getDataByToken(createNewTokenPair.refreshToken)
    const getIatToken = newTokenVerify.iat * 1000

    await userSessionsService.updateUserSessions(getTokenData.id, getTokenData.deviceId, getIatToken, ip, title )


    res.cookie('refreshToken', createNewTokenPair.refreshToken, {httpOnly:true, secure: true})
    res.status(200).send({accessToken: createNewTokenPair.accessToken})

})

authRouter.post('/logout', async (req:Request, res: Response)=>{
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) return res.sendStatus(401)
    const deleteTokenPair = await JWTService.addRefreshTokenInBlackList(refreshToken)
    if(!deleteTokenPair) return res.sendStatus(401)
    res.sendStatus(204)
})