import {attemptsCollection} from "./db";

export const attemptsRepository = {
    async addAttempt(userIP: string, url: string, time:Date){
        return attemptsCollection.insertMany({userIP, url, time})
    },
    async getCountAttempts(userIP: string, url: string, limitTime:Date){
        return attemptsCollection.countDocuments({userIP, url, time: {$gt: limitTime}})
    }

}