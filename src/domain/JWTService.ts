import jwt from "jsonwebtoken"
import {UserDBType} from "../types/types";
import {queryRepository} from "../queryRepository/queryRepository";
import {JWTRepository} from "../repository/JWTRepository";


const JWT_SECRET = process.env.JWT_SECRET || "123"

export const JWTService = {
    async getUseIdByToken (token:string){
        try{
            const result: any = jwt.verify(token, JWT_SECRET)
            return result.userId

        }catch (error){
            return null
        }
    },
    async createJWTPair (user: UserDBType){
        const accessToken = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '20s'})
        return {accessToken, refreshToken}
    },
    async updateorDeleteJWTTokenPair(refreshToken: string){
        const tokenTime = await JWTService.getTokenTime(refreshToken)
        if(!tokenTime) return false
        const findTokenInBlackList = await queryRepository.findTokenInBlackList(refreshToken)
        if(!findTokenInBlackList) return false
        const findUserIdByToken = await JWTService.getUseIdByToken(refreshToken)
        if(findTokenInBlackList) return false
        const findUserById = await queryRepository.findUserById(findUserIdByToken)
        if(!findUserById) return false
        await JWTRepository.addRefreshTokenInBlackList({refreshToken})
        return findUserById
    },
    async getTokenTime (refreshToken: string){
        try {
            const result: any = jwt.verify(refreshToken, JWT_SECRET)
            if (result) {
                return result.exp
            } else{
                return false
            }

        } catch (error){
            return false
        }
    }
}