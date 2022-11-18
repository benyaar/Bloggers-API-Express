import {NextFunction, Request, Response} from "express";
import {body, query, validationResult} from 'express-validator'
import {queryRepository} from "../queryRepository/queryRepository";

export const expressValidator = (req:Request, res:Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errorsMessages: errors.array({onlyFirstError: true}).map( e => {
                return {message: e.msg, field: e.param}

            }) });
    }
    next()
}

export const titleVideoValidation = body('title').trim().isLength({min:1, max: 40})
export const authorVideoValidation = body('author').trim().isLength({min:1, max: 20})
export const minAgeRestrictionValidation = body('minAgeRestriction').trim().isInt({min:1, max: 18})
export const canBeDownloadedValidation = body('canBeDownloaded').trim().isBoolean().trim()
export const publicationDateValidation = body("publicationDate").trim().matches("/(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d\\.\\d+)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d:[0-5]\\d)|(\\d{4}-[01]\\d-[0-3]\\dT[0-2]\\d:[0-5]\\d)/")
export const nameBlogValidation = body('name').trim().isLength({min:1, max: 15})
export const youtubeUrlValidation = body('youtubeUrl').trim().isLength({min:1, max: 100}).isURL()
export const titlePostValidation = body('title').trim().isLength({min:1, max: 30})
export const shortDescriptionPostValidation = body('shortDescription').trim().isLength({min:1, max: 100})
export const contentValidation = body('content').trim().isLength({min:1, max: 1000})
export const blogIdValidation = body('blogId').custom(async (value) => {
    const blogId = await queryRepository.getBlogById(value)
    if(!blogId)  throw new Error('Password confirmation does not match password')
    })

const searchNameTermValidation = query('searchNameTerm').optional(false).trim().default('')
const pageNumberValidation = query('pageNumber').toInt(10).default(1)
const pageSizeValidation = query('pageSize').toInt(10).default(10)
const sortByValidation = query('sortBy').optional(false).trim().default('createdAt')
const sortDirectionValidation = query('sortDirection').optional(false).trim().default('desc')
const searchLoginTerm = query('searchLoginTerm').optional(false).trim().default('')
const searchEmailTerm = query('searchEmailTerm').optional(false).trim().default('')

export const paginationValidation = [searchNameTermValidation, pageNumberValidation, pageSizeValidation, sortByValidation, sortDirectionValidation, searchLoginTerm, searchEmailTerm, expressValidator]

const loginValidation = body('login').trim().isLength({min:3, max:10})
export const emailValidation = body('email').trim().isEmail()
const passwordValidation = body('password').trim().isLength({min:6, max:20})

export const loginInputValidation = [loginValidation, passwordValidation, expressValidator]
export const registrationValidation = [loginValidation, emailValidation, passwordValidation, expressValidator]

export const commentsContentValidation = body("content").trim().isLength({min:20, max:300})

export const availableResolutionsValidation = (req:Request, res:Response, next:NextFunction) => {
    const availableResolutions = req.body.availableResolutions

     const resolution = ["P144", 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440','P2160']
     const validResolution = availableResolutions.every((i :string) => resolution.includes(i))
    if(!validResolution) return res.status(400).send({ errorsMessages: [{ message: 'error availableResolutions' , field: "availableResolutions" }] }
    )
    next()
}
