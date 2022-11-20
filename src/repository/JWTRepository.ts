import {tokenBlackListCollection} from "./db";
import {TokenType} from "../types/types";

export const JWTRepository = {
    async addRefreshTokenInBlackList(refreshToken: TokenType){
        return tokenBlackListCollection.insertMany(refreshToken)
    }
}