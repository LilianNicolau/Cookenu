import { compare } from "bcryptjs";
import {Request, Response} from "express";
import { getUserByEmail } from "../data/getUserByEmail";
import { generateToken } from "../services/authenticator";
import { loginInput } from "../types/types";

let errorCode: number = 400

export const userLogin = async(req: Request, res: Response): Promise <any> => {
    try{

        const {email, password} = req.body as loginInput
        
        if(!email || !password) {
            throw new Error("Please, enter correct email and password")
        }

        if (!email.includes("@")) {
            throw new Error ("Invalid email")
        }

        if (password.length<6) {
            throw new Error ("Enter at least 6 characters")
        }

        const user = await getUserByEmail(email)
        if (!user) {
            throw new Error("User not found")
        }

        const compareResult = await compare(password, user.password)
        if (!compareResult) {
            throw new Error("Invalid password")
        }

        const token = generateToken({id:user.id})
        res.status(200).send({token:token})

    } 
    
    catch(error){
        res.status(errorCode).send(error.sqlMessage || error.message)
}
}