import {UserDBType} from "../types/types";
import {usersCollection} from "./db";

export const usersRepository = {
    async createNewUser (newUser: UserDBType){
        return usersCollection.insertOne(newUser)
    },
    async deleteUser(id: string){
        const deleteUser = await usersCollection.deleteOne({id})
        return deleteUser.deletedCount === 1
    }
}