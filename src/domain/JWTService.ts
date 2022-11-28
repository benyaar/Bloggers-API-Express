import jwt from "jsonwebtoken"
import {UserDBType} from "../types/types";

import {JWTRepository} from "../repository/JWTRepository";


const JWT_SECRET = process.env.JWT_SECRET || "123"

export const JWTService = {
    async getDataByToken (token:string){
        try{
            const result: any = jwt.verify(token, JWT_SECRET)
            return result

        }catch (error){
            return null
        }
    },
    async createJWTPair (userId: string, deviceId: string){
        const accessToken = jwt.sign({userId: userId, deviceId: deviceId}, JWT_SECRET, {expiresIn: '100s'})
        const refreshToken = jwt.sign({userId: userId, deviceId: deviceId}, JWT_SECRET, {expiresIn: '200s'})
        return {accessToken, refreshToken}
    },
    async addRefreshTokenInBlackList(refreshToken: string){
        return await JWTRepository.addRefreshTokenInBlackList({refreshToken})
    },

}
