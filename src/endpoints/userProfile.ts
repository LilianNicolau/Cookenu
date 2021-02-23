import { Request, Response } from "express";
import { getUserById } from "../data/getUserById";
import { getTokenData } from "../services/authenticator";
import { generatedId } from "../services/idGenerator";
import { authenticationData } from "../types/types";


let errorCode: number = 400

export const seeUserProfile = async (req: Request, res: Response): Promise <void> => {
    try {
        const {authorization} = req.headers
        
        const verifyToken: authenticationData = getTokenData(authorization as string)

        const user = await getUserById(verifyToken.id)

        if(!user) {
            throw new Error("User not found")
        }

        res.status(200).send({name:user.name, email:user.email})
 } 
 
 catch (error){
    res.status(errorCode).send({message:error.message})
}
}