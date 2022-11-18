import {ObjectId} from "mongodb";
import bcrypt from "bcrypt"
import {UserDBType} from "../types/types";
import {usersRepository} from "../repository/usersRepository";
import {queryRepository} from "../queryRepository/queryRepository";
import {emailService} from "./emailService";
import  {v4 as uuidv4} from 'uuid'
import add from 'date-fns/add'


export const usersService = {

    async createNewUser(login:string, email:string, password: string){
        const findUserByLogin = await queryRepository.findUserByLogin(login)
        if(findUserByLogin) return false
        const findUserByEmail = await queryRepository.findUserByEmail(email)
        if(findUserByEmail) return false

        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        const code = uuidv4()
        const newUser: UserDBType = {
            _id: new ObjectId(),
            id: new ObjectId().toString(),
            login,
            email,
            createdAt: new Date(),
            passwordHash,
            emailConfirmation: {
                confirmationCode: code,
                expirationDate: add(new Date(),{
                    hours:1,
                    minutes:3,
                }),
                isConfirmed: false
            }
            }
        await usersRepository.createNewUser(newUser)
        await emailService.sendEmail(email, code)

        return newUser
    },
    async deleteUser (id: string){
        return usersRepository.deleteUser(id)
    },

}