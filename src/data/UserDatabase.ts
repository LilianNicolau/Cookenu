import {connection} from "../connection/connection";

export const createUser = async (id: string, name: string, email: string, password: string): Promise <void> => {
    await connection
    .insert({
        id: id,
        name: name,
        email: email,
        password: password
    }). into("Cookenu_Users")
}