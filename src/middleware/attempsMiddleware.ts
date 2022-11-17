import {NextFunction, Request, Response} from "express";
import {attemptsRepository} from "../repository/attemptsRepository";

export const attemptsMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    const limitTime = new Date(new Date().getTime() - 10000)
    const countOfAttempts = await attemptsRepository.getCountAttempts(req.ip, req.url, limitTime)
    const addAttempts = await attemptsRepository.addAttempt(req.ip, req.url, new Date())
    countOfAttempts < 5 ? next() : res.sendStatus(429)
}