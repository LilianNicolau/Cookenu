import {connection} from "../connection/connection";
import { cookenuUser, recipeInput } from "../types/types";

export const createRecipe = async (recipe: recipeInput): Promise <void> => {
    await connection
    .insert({
        id: recipe.id,
        title: recipe.title,
        description: recipe.description,
        creation_date: Date.now, 
        author_id: recipe.author_id,
        
    }). into("Cookenu_Recipes")
}