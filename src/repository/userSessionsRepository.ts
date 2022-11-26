import {UserSessionsType} from "../types/types";
import {usersSessionsCollection} from "./db";

export const userSessionsRepository = {
    async createNewUserSession(userSession: UserSessionsType){
        console.log(userSession)
        return usersSessionsCollection.insertMany(userSession)
    },
    async deleteAllDevice (userId:string){
        const deleteAllSessions = await usersSessionsCollection.deleteMany({userId})
        return deleteAllSessions.deletedCount === 1
    },
    async deleteDeviceByDeviceId(userId: string, deviceId:string){
        const deleteSession = await usersSessionsCollection.deleteOne({userId, deviceId})
        return deleteSession.deletedCount === 1
    },
    async updateUserSessions(userId: string, deviceId: string, iatDate:number, ip: string, title: string) {
        return usersSessionsCollection.updateOne({userId, deviceId},{$set:{lastActiveDate: iatDate, ip,title }});
    }
}