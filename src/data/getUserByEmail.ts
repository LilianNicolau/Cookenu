import {connection} from "../connection/connection"

export const getUserByEmail = async(email:string):Promise<any> =>{
    const result = await connection
        .select("*")
        .from("Cookenu_Users")
        .where({email})
    
    return result[0]
}
