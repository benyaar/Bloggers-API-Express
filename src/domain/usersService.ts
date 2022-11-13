import {ObjectId} from "mongodb";
import bcrypt from "bcrypt"
import {UserDBType} from "../types/types";
import {usersRepository} from "../repository/usersRepository";

export const usersService = {

    async createNewUser(login:string, email:string, password: string){
        const passwordSalt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        const newUser: UserDBType = {
            _id: new ObjectId(),
            id: new ObjectId().toString(),
            login,
            email,
            createdAt: new Date(),
            passwordHash
        }
        await usersRepository.createNewUser(newUser)
        return newUser
    },
    async deleteUser (id: string){
        return usersRepository.deleteUser(id)
    }
}