import {queryRepository} from "../queryRepository/queryRepository";
import bcrypt from "bcrypt";
import {authRepository} from "../repository/authRepository";
import {JWTService} from "./JWTService";

export const authService = {
    async loginUser (login: string, password: string) {
        const findUserByLogin = await queryRepository.findUserByLogin(login)
        if(!findUserByLogin) return false
        const passwordSalt = findUserByLogin.passwordHash.slice(0,29)
        const passwordHash = await bcrypt.hash(password, passwordSalt)
        await authRepository.loginUser(login, passwordHash)
        return JWTService.createJWTToken(findUserByLogin)
    }
}