import {queryRepository} from "../queryRepository/queryRepository";
import bcrypt from "bcrypt";
import {authRepository} from "../repository/authRepository";
import {JWTService} from "./JWTService";
import {UserDBType} from "../types/types";
import {ObjectId} from "mongodb";
import {v4 as uuidv4} from "uuid"
import add from "date-fns/add";
import {usersRepository} from "../repository/usersRepository";
import {emailService} from "./emailService";

import {userSessionsService} from "./userSessionsService";

export const authService = {
    async loginUser (loginOrEmail: string, password: string, ip:string, title:string) {
        const findUserByLoginOrEmail = await queryRepository.findUserByLoginOrEmail(loginOrEmail)
        if(!findUserByLoginOrEmail) return false
        const passwordSalt = findUserByLoginOrEmail.passwordHash.slice(0,29)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        const checkCredentials = await authRepository.loginUser(loginOrEmail, passwordHash)
        if(!checkCredentials) return false
        const deviceId = new ObjectId().toString()
        const createJWT = await JWTService.createJWTPair(checkCredentials.id, deviceId)
         await userSessionsService.createNewUserSession(ip,title,deviceId, findUserByLoginOrEmail, createJWT)
        return createJWT
    },
    async resendingEmail(email: string, user: UserDBType){
        const newEmailConfirmation: UserDBType = {
            _id: new ObjectId(),
            id: user.id,
            login: user.login,
            email: email,
            createdAt: new Date(),
            passwordHash: user.passwordHash,
            emailConfirmation: {
                confirmationCode: uuidv4(),
                expirationDate: add(new Date, {
                    hours: 1,
                    minutes: 3,
                }),
                isConfirmed: false
            }
        }
        await usersRepository.updateUserConfirmationData(newEmailConfirmation)
        await emailService.sendEmail(email, newEmailConfirmation.emailConfirmation.confirmationCode)
        return
    },
    async confirmEmail(code: string, user: UserDBType){
        if(user.emailConfirmation.expirationDate > new Date() && !user.emailConfirmation.isConfirmed){
            const result = usersRepository.updateUserConfirmation(user.id)
            if (!result) return false
            await emailService.resendEmail(user.email, "Your email was confirmed", "Hello! Your email was confirmed")
            return true
        }
    }
}