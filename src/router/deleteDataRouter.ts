import {Router, Request, Response} from "express";
import {deleteDataRepository} from "../repository/deleteDataRepository";

export const deleteDataRouter = Router({})

deleteDataRouter.delete('/all-data', async (req:Request, res:Response) =>{
    await deleteDataRepository.deleteData()
    res.sendStatus(204)
})