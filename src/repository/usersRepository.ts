import {UserDBType} from "../types/types";
import {usersCollection} from "./db";

export const usersRepository = {
    async createNewUser (newUser: UserDBType){
        return usersCollection.insertOne(newUser)
    },
    async deleteUser(id: string){
        const deleteUser = await usersCollection.deleteOne({id})
        return deleteUser.deletedCount === 1
    },
    async updateUserConfirmationData(user: UserDBType){
        const updateUser = await usersCollection.updateOne({id: user.id}, {$set:
                {'emailConfirmation.confirmationCode': user.emailConfirmation.confirmationCode,
                    'emailConfirmation.expirationDate': user.emailConfirmation.expirationDate,
                    'emailConfirmation.isConfirmed': user.emailConfirmation.isConfirmed}})
        return updateUser.matchedCount===1
    },
    async updateUserConfirmation(id: string){
        const updateUser = await usersCollection.updateOne({id},{$set: {'emailConfirmation.isConfirmed': true}})
        return updateUser.matchedCount===1
    }
}