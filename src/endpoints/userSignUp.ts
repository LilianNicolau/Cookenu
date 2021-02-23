import {Request, Response} from "express";
import {createUser} from "../data/UserDatabase";
import {cookenuUser} from "../types/types";
import {generateToken} from "../services/authenticator";
import {generatedId} from "../services/idGenerator";
import {hash} from "../services/HashManager";

let errorCode: number = 400

export const userSignup = async (req: Request, res: Response): Promise <void> => {
    try {
        const {name, email, password} = req.body as cookenuUser
        console.log(req.body)
        
        if (!name || !email || !password) {
            throw new Error ("Please, enter the information required")
        }

        if (!email.includes("@")) {
            throw new Error ("Invalid email")
        }

        if (password.length<6) {
            throw new Error ("Enter at least 6 characters")
        }

        const userId: string = generatedId()
        const hashPassword: string = await hash(password)
      
        await createUser (userId, name, email, hashPassword)
        const token = generateToken({id:userId})
       
        res.status(200).send({"token":token})
       
    } catch(error){
        res.status(errorCode).send(error.sqlMessage || error.message)
    }
}


