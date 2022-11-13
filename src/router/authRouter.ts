import {Request, Response, Router} from "express";
import {paginationValidation} from "../middleware/expressValidator";
import {authService} from "../domain/authService";

export const authRouter = Router({})

authRouter.post('/login', paginationValidation, async (req:Request, res:Response) =>{
    const login = req.body.login
    const password = req.body.password

    const loginUser = await authService.loginUser(login, password)
    if(!loginUser) return res.sendStatus(401)

    res.status(200).send({'accessToken': loginUser})
})