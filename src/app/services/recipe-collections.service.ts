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

    // bookmark collection functions
    addRecipeToUserCollection(recipeId: string){
        return this.databaseService.addToCollection( SubcollectionName.base, recipeId)
    }

    isRecipeInUserCollection(recipeId: string){
        return this.databaseService.checkIfRecipeInCollection( SubcollectionName.base, recipeId)
    }

    removeRecipeFromUserCollection(recipeId: string){

        if(this.isRecipeInFavouritesCollection(recipeId)){

            this.removeRecipeFromFavouritesCollection(recipeId).then(() => {
                return this.databaseService.deleteFromCollection( SubcollectionName.base, recipeId)
            })
        }

         return this.databaseService.deleteFromCollection( SubcollectionName.base, recipeId)
    }

    getSavedRecipesCollection(){
        return this.databaseService.getRecipesInCollection( SubcollectionName.base)
    }

    // favourites collection functions
    addRecipeToFavouritesCollection(recipeId: string){
        return this.databaseService.addToCollection( SubcollectionName.favourites, recipeId)
    }

    isRecipeInFavouritesCollection(recipeId: string){
        return this.databaseService.checkIfRecipeInCollection( SubcollectionName.favourites, recipeId)
    }

    removeRecipeFromFavouritesCollection(recipeId: string){
        return this.databaseService.deleteFromCollection( SubcollectionName.favourites, recipeId)
    }

    getFavouriteRecipesCollection(){
        return this.databaseService.getRecipesInCollection( SubcollectionName.favourites)
    }

}
