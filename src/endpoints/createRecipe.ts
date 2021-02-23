import {Request, Response} from "express";
import { getUserById } from "../data/getUserById";
import { createRecipe} from "../data/RecipeDatabase";
import { getTokenData } from "../services/authenticator";
import { generatedId } from "../services/idGenerator";
import { authenticationData, recipeInput } from "../types/types";

let errorCode: number = 400

export const recipe = async (req: Request, res: Response): Promise <void> => {
    try {
        const { authorization } = req.headers
        const verifyToken: authenticationData = getTokenData(authorization as string)
        const findUser = await getUserById(verifyToken.id)
       
        if(!authorization){
            throw new Error("Send an authorization token")
        }

        if(!findUser) {
            throw new Error("User not found")
        }

        const {title, description} = req.body as recipeInput
        if(!title || description) {
            throw new Error ("Please, enter title and description")
        }

        const recipeId = generatedId();
        const creationDate = Date.now(); 

        const recipeData: recipeInput = {
            id: recipeId,
            title: title,
            description: description,
            creation_date:creationDate,
            author_id: findUser,
          
        }

        await createRecipe(recipeData)
        res.status(200).send({message: "Recipe created"})
        

    } catch (error) {
        res.status(400).send({message:error.message})
    }
}