import {usersCollection} from "./db";

export const authRepository = {
    async loginUser (loginOrEmail:string, passwordHash:string){
        return usersCollection.findOne({$or : [{login:loginOrEmail}, {email: loginOrEmail}], passwordHash})

    }
}