import {Router, Request, Response} from "express";
import {usersService} from "../domain/usersService";
import {UserViewModalType} from "../types/types";
import {basicAuthMiddleware} from "../middleware/basicAuthMiddleware";
import {paginationValidation, registrationValidation} from "../middleware/expressValidator";
import {queryRepository} from "../queryRepository/queryRepository";


export const usersRouter = Router({})

usersRouter.post("/", basicAuthMiddleware, registrationValidation, async (req:Request, res:Response) => {
    const login = req.body.login
    const email = req.body.email
    const password = req.body.password

    const createNewUser = await usersService.createNewUser(login, email, password)
    if(!createNewUser) return res.sendStatus(404)
    const userViewModal: UserViewModalType = {
        id: createNewUser.id,
        login:createNewUser.login,
        email: createNewUser.email,
        createdAt: createNewUser.createdAt
    }

    res.status(201).send(userViewModal)

})

usersRouter.get("/", basicAuthMiddleware, paginationValidation, async (req:Request, res:Response) => {

    let pageNumber: any = req.query.pageNumber
    let pageSize: any = req.query.pageSize
    let sortBy: any = req.query.sortBy
    let sortDirection: any = req.query.sortDirection
    let searchLoginTerm:any = req.query.searchLoginTerm
    let searchEmailTerm: any = req.query.searchEmailTerm
    if (sortDirection !== ('asc' || 'desc')) sortDirection = 'desc'

    const getAllUsers = await queryRepository.getAllUsers(pageNumber, pageSize, sortBy, sortDirection,
        searchLoginTerm, searchEmailTerm)

    res.status(200).send(getAllUsers)
})

usersRouter.delete("/:id", basicAuthMiddleware, async (req:Request, res:Response) => {
    const userId = req.params.id
    const findUserById = await queryRepository.findUserById(userId)
    if(!findUserById) return res.sendStatus(404)
    await usersService.deleteUser(userId)
    res.sendStatus(204)
})



