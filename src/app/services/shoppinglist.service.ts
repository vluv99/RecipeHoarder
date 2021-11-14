import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {UserDatabaseService} from "./user-database.service";
import {DatabaseService} from "./database-service";
import {Ingredient} from "../../../shared/model/Ingredient";


@Injectable({
    providedIn: 'root'
})
export class ShoppinglistService {

    constructor(private authService:AuthService,
                private userDatabaseService:UserDatabaseService) {
    }

    addIngredientToShoppinglist(ing:Ingredient){
        return this.userDatabaseService.addToShoppinglist(ing);
    }

    getShoppinglist(){
        return this.userDatabaseService.getIngredientsFromShoppinglist();
    }

    removeShoppinglistItem(listId: any){
        return this.userDatabaseService.removeFromShoppinglist(listId)
    }

    removeAllIngedients(){
        return this.userDatabaseService.removeAllFromShoppinglist()
    }

    addAllIngredients(ing: Ingredient[]){
        return this.userDatabaseService.addAllToShoppinglist(ing)
    }

    getShoppinglistSuggestion(amount:number){
        return this.userDatabaseService.getShoppinglistSuggestions(amount)
    }

    addShoppinglistSuggestionScore(score:number, ingName: string){
        return this.userDatabaseService.addShoppinglistSuggestionScore(score, ingName)
    }
}
