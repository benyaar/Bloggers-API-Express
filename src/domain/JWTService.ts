import jwt from "jsonwebtoken"
import {UserDBType} from "../types/types";


const JWT_SECRET = process.env.JWT_SECRET || "123"

export const JWTService = {
    async createJWTToken (user: UserDBType) {
        const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '1h'})
        console.log(Date.parse(new Date().toDateString()))
        return token
    },
    async getUseIdByToken (token:string){
        try{
            const result: any = jwt.verify(token, JWT_SECRET)
            return result.userId

        }catch (error){
            return null
        }
    }
}