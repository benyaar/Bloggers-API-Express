import {NextFunction, Request, Response} from "express";
import {body, validationResult} from 'express-validator'

export const titleValidation = body('title').isLength({min:1, max: 40})
export const authorValidation = body('author').isLength({min:1, max: 20})
export const minAgeRestrictionValidation = body('minAgeRestriction').isInt({min:1, max: 18})
export const canBeDownloadedValidation = body('canBeDownloaded').isBoolean()
export const publicationDateValidation = body("publicationDate").isDate()


export const expressValidator = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array({onlyFirstError: true}).map( e => {
               return {message: e.msg, field: e.param}

            }) });
    }
    next()
}

export const availableResolutionsValidation = (req:Request, res:Response, next:NextFunction) => {
    const availableResolutions = req.body.availableResolutions

     const resolution = ["P144", 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440','P2160']
     const validResolution = availableResolutions.every((i :string) => resolution.includes(i))
    if(!validResolution) return res.status(400).send({ errorsMessages: [{ message: 'error availableResolutions' , field: "availableResolutions" }] }
    )
    next()
}