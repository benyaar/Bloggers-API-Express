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
    async createJWTPair (user: UserDBType, deviceId: string){
        const accessToken = jwt.sign({userId: user.id, deviceId: deviceId}, JWT_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign({userId: user.id, deviceId: deviceId}, JWT_SECRET, {expiresIn: '20s'})
        return {accessToken, refreshToken}
    },
    async addRefreshTokenInBlackList(refreshToken: string){
        return await JWTRepository.addRefreshTokenInBlackList({refreshToken})
    },

}
