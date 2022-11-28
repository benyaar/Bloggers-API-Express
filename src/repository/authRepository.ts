import {recoveryCodeCollection, usersCollection} from "./db";
import {RecoveryCodeType} from "../types/types";

export const authRepository = {
    async loginUser (loginOrEmail:string, passwordHash:string){
        return usersCollection.findOne({$or : [{login:loginOrEmail}, {email: loginOrEmail}], passwordHash})

    },
    async passwordRecovery(recoveryCode: RecoveryCodeType) {
        return recoveryCodeCollection.insertMany(recoveryCode)
    }
}