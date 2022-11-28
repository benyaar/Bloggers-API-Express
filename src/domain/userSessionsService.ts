import {TokenPairType, UserDBType, UserSessionsType} from "../types/types";
import {userSessionsRepository} from "../repository/userSessionsRepository";
import {JWTService} from "./JWTService";


export const userSessionsService = {
    async createNewUserSession (ip:string, title:string, deviceId:string, user: UserDBType, token: TokenPairType){
        const checkToken = await JWTService.getDataByToken(token.refreshToken)
        const iatToken = checkToken.iat*1000

        const createNewSession: UserSessionsType = {
            ip: ip,
            title: title,
            lastActiveDate: iatToken,
            deviceId,
            userId: user.id
        }
        return userSessionsRepository.createNewUserSession(createNewSession)
    },
    async updateUserSessions(userId:string, deviceId:string, iatToken: number, ip:string, title: string){
        return userSessionsRepository.updateUserSessions(userId, deviceId, iatToken, ip, title)
    },
    async deleteAllDevice (userId:string){
        return userSessionsRepository.deleteAllDevice(userId)
    },
    async deleteDeviceByDeviceId(userId:string, deviceId:string){
        return userSessionsRepository.deleteDeviceByDeviceId(userId, deviceId)
    }
}