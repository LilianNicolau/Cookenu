import {connection} from "../connection/connection"

export const getUserById = async(id:string):Promise<any> =>{
    const result = await connection
        .select("*")
        .from("Cookenu_Users")
        .where({id})
    
    return result[0]
}
