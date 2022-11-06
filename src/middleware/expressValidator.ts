import {NextFunction, Request, Response} from "express";
import {body, validationResult} from 'express-validator'

export const titleValidation = body('title').isLength({min:1})

export const expressValidator = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}