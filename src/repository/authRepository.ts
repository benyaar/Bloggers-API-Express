import {usersCollection} from "./db";

export const authRepository = {
    async loginUser (login:string, passwordHash:string){
        return usersCollection.findOne({login, passwordHash})

    }
}