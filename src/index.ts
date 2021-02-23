import express, {Express} from 'express';
import cors from 'cors';
import { AddressInfo } from "net";
import knex from "knex";
import dotenv from "dotenv";
import { userSignup } from './endpoints/userSignUp';
import { userLogin } from './endpoints/userSignIn';
import { seeUserProfile } from './endpoints/userProfile';
import { createRecipe } from './data/RecipeDatabase';

const app: Express = express();
app.use(express.json());
app.use(cors());

dotenv.config();

app.post("/user/signup", userSignup)
app.post("/user/login", userLogin)
app.get("/user/profile", seeUserProfile)
app.post("/recipe", createRecipe)

const server = app.listen(process.env.PORT || 3003, () => {
    if (server) {
       const address = server.address() as AddressInfo;
       console.log(`Server is running in http://localhost: ${address.port}`);
    } else {
       console.error(`Failure upon starting server.`);
    }
});
