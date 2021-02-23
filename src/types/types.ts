export type cookenuUser = {
    id: string,
    name: string,
    email: string,
    password: string
}

export type authenticationData = {
    id: string,
}

export type loginInput = {
    email: string,
    password: string
}

export type recipeInput = {
    id: string,
    title: string,
    description: string,
    creation_date: number,
    author_id: string
}
