import {Injectable} from "@angular/core";
import {AuthService} from "./auth-service";
import {SubcollectionName, UserDatabaseService} from "./user-database.service";


@Injectable({
    providedIn: 'root'
})
export class RecipeCollectionsService {

    constructor(private authService:AuthService,
                private databaseService:UserDatabaseService) {
    }

    addRecipeToUserCollection(recipeId: string){
        return this.databaseService.addToCollection( SubcollectionName.base, recipeId)
    }

    isRecipeInUserCollection(recipeId: string){
        return this.databaseService.checkIfRecipeInCollection( SubcollectionName.base, recipeId)
    }

    removeRecipeFromUserCollection(recipeId: string){
        return this.databaseService.deleteFromCollection( SubcollectionName.base, recipeId)
    }

    getSavedRecipesCollection(){
        return this.databaseService.getRecipesInCollection( SubcollectionName.base)
    }

}
