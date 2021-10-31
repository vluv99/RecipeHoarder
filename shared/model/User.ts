import {Recipe} from "./Recipe";


export interface User {
    uid: string;
    email: string;
    name: string;
    username: string;
    gender: string;
    birthDate: Date;
    saved: {recipeId: string, favourite: boolean}[]
    //photoURL: string;
    emailVerified: boolean;
}
